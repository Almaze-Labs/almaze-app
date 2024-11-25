'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { Providers } from '@/components/providers/privy-provider';
import { StarredChat } from '@/components/chat/sidebar/StarredChat';
import { SidebarHeader } from '@/components/chat/sidebar/SidebarHeader';
import { IntegrationButton } from '@/components/chat/IntegrationButton';
import { ChatInput } from '@/components/chat/ChatInput';
import { WelcomeHeader } from '@/components/chat/WelcomeHeader';
import MessageBubble from '@/components/chat/MessageBubble';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, LogOut, Compass ,Landmark, Wrench, ScanSearch, Computer  } from 'lucide-react';
import Avatar, { genConfig } from 'react-nice-avatar';
import logo from "@/public/assets/logo/landing-logo-blue.png"
import { NICKNAMES } from '@/components/chat/constants/nicknames'; 

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  title: string;
  date: string;
  messages: Message[];
  isStarred: boolean;
}

function DashboardContent() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(() => uuidv4());
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showLogout, setShowLogout] = useState(false);
  const [userName, setUserName] = useState('ALMAZE');
  const [avatarConfig, setAvatarConfig] = useState(() => genConfig());
  const { ready, authenticated, logout: privyLogout  } = usePrivy();
  const router = useRouter();
  const { wallets } = useWallets();
  const sidebarTimeoutRef = useRef<NodeJS.Timeout>();
  const [isLongResponse, setIsLongResponse] = useState(false);

  //Random Username Generator
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * NICKNAMES.length);
    const selectedName = NICKNAMES[randomIndex];
    setUserName(selectedName);
    setAvatarConfig(genConfig(selectedName));
  }, []);
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setSidebarOpen(false);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const startNewChat = useCallback(() => {
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
    setMessages([]);
    setCurrentConversation(null);
    setSidebarOpen(false);
    // Force scroll to input
    setTimeout(() => {
      const inputElement = document.querySelector('input[type="text"]');
      (inputElement as HTMLInputElement)?.focus();
    }, 100);
  }, [isMobile]);

  const handleStarChat = useCallback((id: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === id ? { ...conv, isStarred: !conv.isStarred } : conv
    ));
  }, []);

  const loadConversation = useCallback((conversation: Conversation) => {
    setSessionId(conversation.id);
    setMessages(conversation.messages);
    setCurrentConversation(conversation);
    if (isMobile) setSidebarOpen(false);
  }, [isMobile]);

  // Removed unused deleteConversation function
  const handleSidebarHover = (isHovering: boolean) => {
    if (isMobile) return;
    
    if (sidebarTimeoutRef.current) {
      clearTimeout(sidebarTimeoutRef.current);
    }

    if (isHovering) {
      setSidebarOpen(true);
    } else {
      sidebarTimeoutRef.current = setTimeout(() => {
        setSidebarOpen(false);
      }, 300); // Small delay before closing
    }
  };

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);

  const handleLogout = useCallback(async () => {
    try {
      // Disconnect any connected wallets first
      for (const wallet of wallets) {
        try {
          await wallet.disconnect();
        } catch (e) {
          console.error('Error disconnecting wallet:', e);
        }
      }

      // Remove cookie before Privy logout to prevent race conditions
      Cookies.remove('privy-authenticated', { path: '/' });
      
      // Perform Privy logout
      await privyLogout();
      
      // Clear any local storage items
      localStorage.removeItem('privy:embedded-wallet:iframe-ready');
      localStorage.removeItem('privy:embedded-wallet:ready');
      
      // Redirect to auth page
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Ensure redirect happens even if there's an error
      router.push('/');
    }
  }, [privyLogout, router, wallets]);

  // console.log("Cook: ",Cookies.get("privy-authenticated"))
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLongResponse(true);
    }, 10000);
    scrollToBottom();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      const messageContent = processResponse(data);

      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: messageContent,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (!currentConversation) {
        const newConversation: Conversation = {
          id: sessionId,
          title: input.slice(0, 30) + (input.length > 30 ? '...' : ''),
          date: new Date().toLocaleDateString(),
          messages: [userMessage, assistantMessage],
          isStarred: false
        };
        setConversations(prev => [newConversation, ...prev]);
        setCurrentConversation(newConversation);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        id: uuidv4(),
        role: 'system',
        content: 'Sorry, something went wrong. Please try again.',
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
      setIsLongResponse(false);  
      clearTimeout(timer);  
      scrollToBottom();
    }
  };

  return (
    <Providers>
      <div className="flex h-screen bg-gray-50">
        {/* Always visible sidebar strip */}
        <div
          className="fixed left-0 top-0 h-full z-40 flex border shadow-sm bg-white"
          onMouseEnter={() => handleSidebarHover(true)}
          onMouseLeave={() => handleSidebarHover(false)}
        >
          {/* Thin visible strip when sidebar is closed */}
          <div className={`w-14 h-full bg-white hover:bg-gray-50 transition-colors ${isSidebarOpen ? 'hidden' : 'block'}`} />

          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 320, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-white border-r flex flex-col overflow-hidden h-full"
              >
                <SidebarHeader onNewChat={startNewChat} logo={logo}/>
                
                <div className="flex-1 overflow-y-auto">
                  {/* Starred Chats */}
                  <div className="p-4">
                    <h2 className="text-xs text-gray-500 font-medium mb-2">STARRED CHATS</h2>
                    <div className="space-y-2">
                      {conversations
                        .filter(chat => chat.isStarred)
                        .map(chat => (
                          <StarredChat
                            key={chat.id}
                            title={chat.title}
                            isStarred={chat.isStarred}
                            onClick={() => loadConversation(chat)}
                            onStar={() => handleStarChat(chat.id)}
                          />
                        ))}
                    </div>
                  </div>

                  {/* Regular Conversations */}
                  <div className="p-4">
                    <h2 className="text-xs text-gray-500 font-medium mb-2">CONVERSATIONS</h2>
                    <div className="space-y-2">
                      {conversations
                        .filter(chat => !chat.isStarred)
                        .map(chat => (
                          <StarredChat
                            key={chat.id}
                            title={chat.title}
                            isStarred={chat.isStarred}
                            onClick={() => loadConversation(chat)}
                            onStar={() => handleStarChat(chat.id)}
                          />
                        ))}
                    </div>
                  </div>
                </div>

                {/* User Section with Logout */}
                <div className="p-4 border-t">
                  <div 
                    className="relative"
                    onMouseEnter={() => setShowLogout(true)}
                    onMouseLeave={() => setShowLogout(false)}
                  >
                    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer w-full">
                      <div className="flex items-center gap-2 w-full">
                        <Avatar style={{ width: '2rem', height: '2rem' }} {...avatarConfig} />
                        <div className='flex flex-col w-full'> 
                          <div className='flex flex-row items-center justify-between w-full'>
                            <span className="text-sm text-gray-600">{userName}</span>
                            <Settings className="h-4 w-4 text-gray-400 mr-2" />
                          </div>
                          <div className="text-[8px] text-gray-400">
                            <span className="truncate">{sessionId}</span>
                          </div>
                      </div>
                    </div>
                  </div>

                    <AnimatePresence>
                      {showLogout && (
                        <motion.button
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          onClick={handleLogout}
                          className="absolute bottom-full left-0 w-full p-2 mb-1 bg-white shadow-lg rounded-lg border flex items-center gap-2 text-gray-600 hover:bg-gray-50"
                        >
                          <LogOut className="h-4 w-4" />
                          <span className="text-sm">Logout</span>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                  
                 
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Content Area with proper margin for sidebar strip */}
        <div className={`flex-1 flex flex-col relative transition-all duration-300 ${isSidebarOpen ? 'ml-[320px]' : 'ml-2'}`}>
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col relative bg-gray-50">
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="absolute top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
            >
              ☰
            </button>
          )}

          <div className="flex-1 p-8 flex flex-col items-center justify-center max-w-3xl mx-auto w-full">
            {messages.length === 0 ? (
              <>
                <WelcomeHeader name={userName} version="v1.0 - Launching ALMAZE" />
                <p className="text-gray-500 text-center mb-8 max-w-lg">
                  Ready to help you with your tasks and questions.
                </p>

                <div className="w-full mb-8 text-[15px] text-gray-400  ">
                  <ChatInput 
                    input={input}
                    setInput={setInput}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                  />
                </div>

                {/* Integration Buttons */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-4 text-center">
                    EXPLORE INTEGRATIONS
                  </h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <IntegrationButton 
                      Icon={Compass} 
                      label="COMPASS" 
                      color="#1DA2FF" 
                      onClick={() => setInput("How Almaze actually works?")}
                    />
                    <IntegrationButton 
                      Icon={Landmark} 
                      label="ARCHITECT" 
                      color="#FFBA17"
                      onClick={() => setInput("Help me design a learning path for becoming a full-stack developer")}
                    />
                    <IntegrationButton 
                      Icon={Wrench}
                      label="TOOLSMITH" 
                      color="#FF5C3D"
                      onClick={() => setInput("What tools and resources would you recommend for learning data science?")}
                    />
                    <IntegrationButton 
                      Icon={ScanSearch} 
                      label="SCOUT" 
                      color="#9700F4"
                      onClick={() => setInput("What are the latest trends in artificial intelligence and machine learning?")}
                    />
                    <IntegrationButton 
                      Icon={Computer} 
                      label="TECHSAGE" 
                      color="#8FBC8F"
                      onClick={() => setInput("Create an HTML/CSS template for a responsive portfolio website")}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full space-y-6 bg-gray-50">
                {messages.map((message, i) => (
                  <MessageBubble 
                    key={message.id} 
                    message={message} 
                    isLast={i === messages.length - 1}
                    userName={userName}
                    avatarConfig={avatarConfig}
                  />
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center p-4 gap-3"
                  >
                    {/* Dots animation */}
                    <div className="flex gap-2">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                        className="w-2 h-2 bg-blue-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                        className="w-2 h-2 bg-blue-300 rounded-full"
                      />
                    </div>

                    {/* Processing message that appears after delay */}
                    {isLongResponse && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                      >
                        <motion.p 
                          className="text-[#1DA2FF] text-sm font-offbit"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          Hold on a moment...
                        </motion.p>
                      </motion.div>
                    )}
                  </motion.div>
)}
                <div ref={messagesEndRef}  />
                <div className=" mt-6 w-full text-[15px] text-gray-400 ">
                  <ChatInput 
                    input={input}
                    setInput={setInput}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
      
    </Providers>
  );
}

// Helper function to process API response
function processResponse(data: { response: string; agent_responses?: { agent: string; response: string }[] }): string {
try {
const responseObj = JSON.parse(data.response);
let messageContent = '';
const compassResponse = responseObj.agent_responses?.find(
(response: { agent: string }) => response.agent === "compass"
);

if (compassResponse) {
messageContent = compassResponse.response;
} else {

// Process Scout Response
const scoutResponse = responseObj.agent_responses?.find(
(response: { agent: string }) => response.agent === "scout"
);

if (scoutResponse) {
try {
const researchData = JSON.parse(scoutResponse.response);
messageContent = researchData.message || scoutResponse.response;
} catch {
messageContent = scoutResponse.response;
}
messageContent = messageContent
.replace(/\b(bound)\b/gi, '**$1**')
.replace(/(bound)/gi, '**$1**');
}

// Process Tech Sage Response
const techSageResponse = responseObj.agent_responses?.find(
(response: { agent: string }) => response.agent === "techsage"
);

if (techSageResponse) {
try {
const engineerData = JSON.parse(techSageResponse.response);
messageContent = formatEngineerResponse(engineerData);
} catch (parseError) {
console.error('Error parsing techsage response:', parseError);
messageContent = techSageResponse.response;
}
}
}
return messageContent || 'Received a response but couldn\'t process it properly.';
} catch (error) {
console.error('Error processing response:', error);
return data.response;
}
}

// Helper function to format engineer response
function formatEngineerResponse(engineerData: { status: string; message: string; suggestions?: string[]; query: string; analysis: { task_type: string; language: string; technologies: string[] }; implementation: { files: { filename: string; language: string; content: string }[]; setup?: string; usage?: string; api_docs?: string; configuration?: string }; files_created?: string[] }): string {
if (engineerData.status === "error") {
let content = `⚠️ Error: ${engineerData.message}\n\n`;
if (engineerData.suggestions?.length) {
content += "Suggestions:\n";
engineerData.suggestions.forEach((suggestion: string) => {
content += `- ${suggestion}\n`;
});
}
return content;
}

let content = `# ${engineerData.query}\n\n`;

content += `## Project Analysis\n`;
content += `- Type: ${engineerData.analysis.task_type}\n`;
content += `- Language: ${engineerData.analysis.language}\n`;
content += `- Technologies: ${engineerData.analysis.technologies.join(", ")}\n\n`;

content += `## Implementation\n\n`;
engineerData.implementation.files.forEach((file: { filename: string; language: string; content: string }) => {
content += `### File: ${file.filename}\n`;
content += `\`\`\`${file.language}\n${file.content}\n\`\`\`\n\n`;
});

if (engineerData.implementation.setup) {
content += `## Setup Instructions\n${engineerData.implementation.setup}\n\n`;
}

if (engineerData.implementation.usage) {
content += `## Usage Examples\n${engineerData.implementation.usage}\n\n`;
}

if (engineerData.implementation.api_docs) {
content += `## API Documentation\n${engineerData.implementation.api_docs}\n\n`;
}

if (engineerData.implementation.configuration) {
content += `## Configuration\n${engineerData.implementation.configuration}\n\n`;
}

if (engineerData.files_created?.length) {
content += `## Files Created\n`;
engineerData.files_created.forEach((file: string) => {
content += `- \`${file}\`\n`;
});
}

return content;
}

export default function Dashboard() {
  return (
    <Providers>
      <DashboardContent />
    </Providers>
  );
} 
