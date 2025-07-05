import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "تلاش کریں...",
  className = "" 
}) => {
  return (
    <motion.div
      whileFocus={{ scale: 1.02 }}
      className={`relative ${className}`}
    >
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <ApperIcon name="Search" className="w-5 h-5 text-slate-400" />
      </div>
      
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full pl-12 pr-4 py-3 rounded-lg
          bg-white/50 backdrop-blur-sm border-2 border-white/30
          focus:border-primary-500 focus:bg-white/70 focus:outline-none
          transition-all duration-200
          placeholder-slate-500
        "
      />
      
      {value && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onChange({ target: { value: '' } })}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          <ApperIcon name="X" className="w-5 h-5" />
        </motion.button>
      )}
    </motion.div>
  )
}

export default SearchBar