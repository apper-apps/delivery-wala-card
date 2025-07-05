import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import { calculateDaysUntilNext } from '@/utils/dateUtils'

const DeliveryBoyCard = ({ deliveryBoy, isToday = false, delay = 0 }) => {
  const navigate = useNavigate()
  const daysUntil = calculateDaysUntilNext(deliveryBoy.assignedDay)
  
  const handleCardClick = () => {
    navigate(`/delivery-boy/${deliveryBoy.Id}`)
  }
  
  const handlePhoneClick = (e) => {
    e.stopPropagation()
    window.open(`tel:${deliveryBoy.phoneNumber}`, '_self')
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={handleCardClick}
      className={`
        glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300
        ${isToday 
          ? 'ring-4 ring-green-500/50 bg-gradient-to-r from-green-50/50 to-emerald-50/50' 
          : 'hover:shadow-2xl'
        }
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <ApperIcon name="User" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">{deliveryBoy.naam}</h3>
            <p className="text-sm text-slate-600">{deliveryBoy.assignedDay}</p>
          </div>
        </div>
        
        {isToday && (
          <Badge variant="success" animate={true}>
            آج کا دن
          </Badge>
        )}
      </div>
      
      {/* Details */}
      <div className="space-y-2 mb-4">
        <p className="text-slate-600 text-sm line-clamp-2">{deliveryBoy.tafseelat}</p>
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ApperIcon name="Clock" className="w-4 h-4 text-slate-500" />
          <span className="text-sm text-slate-600">
            {daysUntil === 0 ? 'آج' : `${daysUntil} دن بعد`}
          </span>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePhoneClick}
          className="glass-button p-2 rounded-full"
        >
          <ApperIcon name="Phone" className="w-5 h-5 text-primary-600" />
        </motion.button>
      </div>
      
      {/* Days Counter */}
      {daysUntil > 0 && (
        <div className="mt-4 text-center">
          <div className="countdown-number">{daysUntil}</div>
          <div className="text-sm text-slate-500">دن باقی</div>
        </div>
      )}
    </motion.div>
  )
}

export default DeliveryBoyCard