import { motion } from "motion/react";
import { Icon } from "@iconify/react";

interface ButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  icon?: string;
  onClick: () => void;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  delay?: number;
}

const Button = ({
  children,
  primary = true,
  icon,
  onClick,
  fullWidth = false,
  type = "button",
  disabled = false,
  delay = 0,
}: ButtonProps) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        py-3 px-6 rounded-full font-medium flex items-center justify-center gap-2
        ${fullWidth ? "w-full" : ""}
        ${
          primary
            ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-white"
            : "border-2 border-yellow-400 text-gray-700"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 17, delay }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      {icon && <Icon icon={icon} />}
      {children}
    </motion.button>
  );
};

export default Button;
