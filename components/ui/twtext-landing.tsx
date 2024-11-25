import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (isTyping) {
      if (displayedText.length < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
        setTimeout(() => {
          setDisplayedText('');
          setIsTyping(true);
        }, 3000);
      }
    }
  }, [displayedText, isTyping, text]);

  return (
    <span className="border-r-2 border-black animate-pulse">
      {displayedText}
    </span>
  );
};
