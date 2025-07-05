import React from 'react'
import Input from '@/components/atoms/Input'

const FormField = ({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  required = false,
  error,
  icon,
  className = ""
}) => {
  const handleChange = (e) => {
    onChange(name, e.target.value)
  }
  
  return (
    <div className={className}>
      <Input
        label={label}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        error={error}
        icon={icon}
        required={required}
      />
    </div>
  )
}

export default FormField