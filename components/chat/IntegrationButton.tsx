import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react"; 

interface IntegrationButtonProps {
  Icon: LucideIcon;
  label: string;
  color: string;
  onClick: () => void;
}

export const IntegrationButton = ({ Icon, label, color, onClick }: IntegrationButtonProps) => (
  <motion.button
    className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-200 bg-white "
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    style={{ color: color }}
  >
    <Icon size={24} /> 
    <span className="text-sm font-medium font-offbit">{label}</span>
  </motion.button>
);