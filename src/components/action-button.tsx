import Link from "next/link";
import { motion } from "framer-motion";

interface ActionButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "outline" | 'primary' | 'secondary'; // Added variant options
  className?: string; // Added className prop
}

export function ActionButton({ label, onClick, href, variant = "default", className = "" }: ActionButtonProps) {
  const baseClasses = "block py-3 px-6 rounded-full font-medium transition-colors text-center";

  const variantClasses = {
    default: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white",
    outline: "border-2 border-purple-600 hover:border-purple-500 text-white hover:bg-purple-600/20",
    primary: `border-purple-600 bg-black text-white hover:text-purple-500 ${className}`, //Added primary and secondary variants
    secondary: `border-white/20 bg-black text-white hover:text-purple-500 ${className}` //Added primary and secondary variants

  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant] || ''}`; // Handle cases where variant is not defined

  const buttonContent = (
    <motion.span
      className="block"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {buttonContent}
    </button>
  );
}