import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar, { AvatarConfig } from 'react-nice-avatar';
import ReactMarkdown from 'react-markdown';
import { Bot, Copy, Check } from 'lucide-react'; 

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

interface MessageBubbleProps {
  message: Message;
  isLast: boolean;
  userName?: string;
  avatarConfig?: AvatarConfig; 
}

const MessageBubble = ({ message, userName, avatarConfig }: MessageBubbleProps) => {
  const isUser = message.role === 'user';
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [copiedCodeBlock, setCopiedCodeBlock] = useState<string | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleCodeCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCodeBlock(code);
      setTimeout(() => setCopiedCodeBlock(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const bubbleVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const iconVariants = {
    hover: { 
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.5 }
    }
  };

  const copyButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={bubbleVariants}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-start gap-3`}
    >
      {!isUser && (
        <motion.div 
          className="flex-shrink-0 bg-[#1DA2FF] rounded-full p-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            variants={iconVariants}
            whileHover="hover"
          >
            <Bot className="w-6 h-6 text-white" />
          </motion.div>
        </motion.div>
      )}
      
      <div 
        className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} relative`}
        onMouseEnter={() => !isUser && setIsHovered(true)}
        onMouseLeave={() => !isUser && setIsHovered(false)}
      >
        <motion.div 
          className="flex items-center gap-2 mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-sm text-gray-600 font-offbit">
            {isUser ? userName : 'ALMAZE'}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </motion.div>
        
        <motion.div 
          className={`rounded-xl px-4 py-2 max-w-2xl relative ${
            isUser 
              ? 'bg-[#1DA2FF] text-white' 
              : 'bg-white border border-gray-200'
          }`}
          whileHover={{ scale: 1.006 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {!isUser && (
            <AnimatePresence>
              {isHovered && (
                <motion.button
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={copyButtonVariants}
                  className="absolute -top-2 -right-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm"
                  onClick={handleCopy}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isCopied ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check className="w-4 h-4 text-green-500" />
                    </motion.div>
                  ) : (
                    <Copy className="w-4 h-4 text-gray-500" />
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          )}
          <div className="mt-2">
            <ReactMarkdown 
              className="prose prose-sm"
              components={{
                code({ inline, className, children, ...props }: { inline?: boolean, className?: string, children?: React.ReactNode }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const code = String(children).replace(/\n$/, '');
                  
                  if (inline) {
                    return (
                      <code 
                        className={`${isUser ? 'bg-blue-400/50' : 'bg-gray-100'} rounded px-1 py-0.5 text-sm`} 
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }

                  return (
                    <div className="relative group">
                      <div className="absolute right-2 top-2 flex items-center gap-2">
                        {match && (
                          <span className="text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
                            {match[1]}
                          </span>
                        )}
                          onClick={() => handleCodeCopy(code)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity bg-white hover:bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs flex items-center gap-1 shadow-sm"
                        >
                          {copiedCodeBlock === code ? (
                            <>
                              <Check className="w-3 h-3" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copy code
                            </>
                          )}
                        </button>
                      </div>
                      <div 
                        className={`${
                          isUser ? 'bg-blue-400/50' : 'bg-gray-100'
                        } rounded-lg my-2 overflow-hidden`}
                      >
                        <div className="overflow-x-auto">
                          <pre className="p-2 text-sm">
                            <code {...props}>{code}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  );
                },
                p: ({ children }) => (
                  <p className="whitespace-pre-wrap break-words">{children}</p>
              }}
              {message.content}
            </ReactMarkdown>
          </div>
        </motion.div>
      </div>

      {isUser && (
        <motion.div 
          className="flex-shrink-0"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Avatar style={{ width: '2.5rem', height: '2.5rem' }} {...avatarConfig} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default MessageBubble;