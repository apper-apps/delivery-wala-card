import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Input = ({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  error,
  icon,
  required = false,
  className = "",
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <ApperIcon name={icon} className="w-5 h-5 text-slate-400" />
          </div>
        )}
        
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
            bg-white/50 backdrop-blur-sm border-white/30
            focus:border-primary-500 focus:bg-white/70 focus:outline-none
            ${icon ? 'pl-12' : ''}
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
          <ApperIcon name="AlertCircle" className="w-4 h-4" />
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}

export default Input