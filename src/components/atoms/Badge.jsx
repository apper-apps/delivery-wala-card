import React from 'react'
import { motion } from 'framer-motion'

const Badge = ({ 
  children, 
  variant = "primary", 
  size = "medium",
  animate = false,
  className = "" 
}) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white",
    secondary: "bg-gradient-to-r from-slate-500 to-slate-600 text-white",
    success: "bg-gradient-to-r from-green-500 to-green-600 text-white",
    warning: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white",
    glass: "bg-white/20 backdrop-blur-md text-slate-700 border border-white/30"
  }
  
  const sizes = {
    small: "px-2 py-1 text-xs",
    medium: "px-3 py-1 text-sm",
    large: "px-4 py-2 text-base"
  }
  
  const badgeClasses = `
    inline-flex items-center rounded-full font-semibold
    ${variants[variant]} ${sizes[size]} ${className}
    ${animate ? 'animate-pulse-soft' : ''}
  `
  
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={badgeClasses}
    >
      {children}
    </motion.span>
  )
}

export default Badge