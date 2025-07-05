import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = "primary", 
  size = "medium", 
  icon, 
  iconPosition = "left",
  className = "",
  disabled = false,
  ...props 
}) => {
  const baseClasses = "font-semibold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
  
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    glass: "glass-button text-slate-700",
    outline: "border-2 border-primary-500 text-primary-600 hover:bg-primary-50"
  }
  
  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg"
  }
  
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`
  
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={buttonClasses}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <ApperIcon name={icon} className="w-5 h-5" />
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <ApperIcon name={icon} className="w-5 h-5" />
      )}
    </motion.button>
  )
}

export default Button