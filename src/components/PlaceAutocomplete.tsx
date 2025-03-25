import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";

interface PlaceAutocompleteProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  isLoading: boolean;
  delay?: number;
  icon?: string;
}

const PlaceAutocomplete = ({
  label,
  placeholder,
  value,
  onChange,
  suggestions,
  isLoading,
  delay = 0,
  icon = "mdi:map-marker",
}: PlaceAutocompleteProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <div
        className={`relative flex items-center border-2 rounded-lg overflow-hidden 
          ${
            isFocused
              ? "border-yellow-400 ring-2 ring-yellow-200"
              : "border-gray-300"
          }`}
        onClick={(e) => {
          e.stopPropagation();
          setShowSuggestions(true);
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute left-3 text-gray-500"
        >
          <Icon icon={icon} className="text-xl" />
        </motion.div>
        <input
          type="text"
          className="w-full py-3 px-10 outline-none bg-white text-gray-700"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-3 text-gray-400 hover:text-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
            }}
          >
            <Icon icon="mdi:close-circle" />
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {showSuggestions && (value || suggestions.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
          >
            {isLoading ? (
              <div className="p-4 flex items-center justify-center text-gray-500">
                <Icon icon="mdi:loading" className="animate-spin mr-2" />
                <span>Searching places...</span>
              </div>
            ) : suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  className="p-3 hover:bg-yellow-50 cursor-pointer flex items-center border-b border-gray-100 last:border-b-0"
                  whileHover={{ backgroundColor: "#fef3c7" }}
                  onClick={() => {
                    onChange(suggestion);
                    setShowSuggestions(false);
                  }}
                >
                  <Icon
                    icon="mdi:map-marker"
                    className="mr-2 text-yellow-400"
                  />
                  <span>{suggestion}</span>
                </motion.div>
              ))
            ) : value ? (
              <div className="p-4 text-gray-500">No results found</div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PlaceAutocomplete;
