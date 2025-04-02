import { motion } from "motion/react";
import { Icon } from "@iconify/react";

const Button = ({
  children,
  icon,
  onClick,
  fullWidth,
  disabled = false,
  className,
}: {
  children?: string;
  icon?: string;
  delay?: number;
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <motion.button
      className={`${className ?? ""} ${
        fullWidth ? "w-full" : ""
      } bg-yellow-400 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      // delay logic can be handled externally if needed
    >
      {icon && <Icon icon={icon} className="text-lg" />}
      {children}
    </motion.button>
  );
};

export default Button;
