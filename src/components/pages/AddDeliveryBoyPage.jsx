import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import DeliveryBoyForm from '@/components/organisms/DeliveryBoyForm'

const AddDeliveryBoyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-2xl p-6 mb-8 text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="UserPlus" className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
          نیا ڈیلیوری بوائے شامل کریں
        </h1>
        
        <p className="text-slate-600 max-w-2xl mx-auto">
          اپنے سپر اسٹور کے لیے نیا ڈیلیوری بوائے کی تمام تفصیلات درج کریں۔ 
          نام، فون نمبر، اور ڈیلیوری کا دن منتخب کریں۔
        </p>
      </motion.div>
      
      {/* Add Form */}
      <DeliveryBoyForm />
    </div>
  )
}

export default AddDeliveryBoyPage