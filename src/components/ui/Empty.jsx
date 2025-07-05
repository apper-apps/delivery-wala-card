import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "کوئی ڈیلیوری بوائے نہیں ملے",
  subtitle = "ابھی تک کوئی ڈیلیوری بوائے شامل نہیں کیا گیا",
  actionText = "پہلا ڈیلیوری بوائے شامل کریں",
  actionPath = "/add-delivery-boy",
  icon = "Users"
}) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
          className="w-24 h-24 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name={icon} className="w-12 h-12 text-white" />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-slate-800 mb-2">
          {title}
        </h3>
        
        <p className="text-slate-600 mb-8 leading-relaxed">
          {subtitle}
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(actionPath)}
          className="btn-primary flex items-center space-x-2 mx-auto"
        >
          <ApperIcon name="Plus" className="w-5 h-5" />
          <span>{actionText}</span>
        </motion.button>
      </motion.div>
    </div>
  )
}

export default Empty