import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ message = "Kuch galat ho gaya hai", onRetry }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-2xl p-8 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name="AlertCircle" className="w-10 h-10 text-white" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          مسئلہ ہے!
        </h2>
        
        <p className="text-slate-600 mb-6">
          {message}
        </p>
        
        <div className="space-y-3">
          {onRetry && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRetry}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <ApperIcon name="RefreshCw" className="w-5 h-5" />
              <span>دوبارہ کوشش کریں</span>
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="btn-secondary w-full flex items-center justify-center space-x-2"
          >
            <ApperIcon name="Home" className="w-5 h-5" />
            <span>واپس جائیں</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default Error