import { RiTwitterXLine } from "react-icons/ri";
import { SiGithub , SiGitbook  } from "react-icons/si";
import Image, { StaticImageData } from 'next/image';

interface SidebarHeaderProps {
  onNewChat: () => void;
  logo: StaticImageData;
}

export const SidebarHeader = ({ onNewChat, logo }: SidebarHeaderProps) => (
  <div className="p-4 border-b">
    <div className="flex items-center justify-between mb-10">
      <Image src={logo} alt="Almaze Logo" width={26}  />
          <a href="https://x.com/almaze_ai" target='_blank'>
            <RiTwitterXLine className='cursor-pointer text-gray-600 hover:text-gray-800 transition-colors'/>
          </a>
          <a href="https://almaze.gitbook.io/docs/" target='_blank'>
            <SiGitbook className='cursor-pointer text-gray-600 hover:text-gray-800 transition-colors'/>
          </a>
          <a href="https://github.com/Almaze-Labs" target='_blank'>
            <SiGithub className='cursor-pointer text-gray-600 hover:text-gray-800 transition-colors'/>
          </a>
      </div>
    </div>
    
    <button 
      onClick={onNewChat}
      className="w-full py-4 text-blue-500 border-2 border-dashed border-blue-200 rounded-lg bg-gradient-to-t from-[rgba(29,162,255,0.2)] to-[rgba(29,162,255,0)] hover:bg-blue-50 transition-colors text-sm"
    >
      ⊕ Start a new chat
    </button>
  </div>
);