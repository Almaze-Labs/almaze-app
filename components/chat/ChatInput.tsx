interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}

export const ChatInput = ({ input, setInput, handleSubmit, isLoading }: ChatInputProps) => (
  <form onSubmit={handleSubmit} className="relative">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="What's on your mind?"
      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:ring-1 focus:ring-[#1DA2FF] focus:outline-none hover:ring-[#1DA2FF] hover:ring-1 transition duration-200 ease-linear" 
      disabled={isLoading}
    />
    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-[12px] text-gray-400">
      Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">⌘</kbd> to send
    </div>
  </form>
);