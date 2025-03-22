// components/TextField.jsx
import { motion } from "motion/react";
import { Icon } from "@iconify/react";

interface TextFieldProps {
  label: string;
  type?: string;
  placeholder: string;
  icon?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  required?: boolean;
  delay?: number;
}

const TextField = ({
  label,
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
  error,
  required = false,
  delay = 0,
}: TextFieldProps) => {
  return (
    <motion.div
      className="space-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon icon={icon} className="text-gray-400" />
          </div>
        )}
        <motion.input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`block w-full py-3 ${
            icon ? "pl-10" : "pl-4"
          } pr-4 border rounded-lg focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          required={required}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1 shake">{error}</p>}
    </motion.div>
  );
};

export default TextField;
