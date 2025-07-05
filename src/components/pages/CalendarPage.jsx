import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { deliveryBoyService } from '@/services/api/deliveryBoyService'
import { getCurrentDay } from '@/utils/dateUtils'

const CalendarPage = () => {
  const [deliveryBoys, setDeliveryBoys] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const days = [
    { name: "Aitwar", label: "اتوار", color: "from-red-500 to-red-600" },
    { name: "Somwar", label: "سوموار", color: "from-blue-500 to-blue-600" },
    { name: "Mangal", label: "منگل", color: "from-green-500 to-green-600" },
    { name: "Budh", label: "بدھ", color: "from-yellow-500 to-yellow-600" },
    { name: "Jumeraat", label: "جمعرات", color: "from-purple-500 to-purple-600" },
    { name: "Jumma", label: "جمعہ", color: "from-pink-500 to-pink-600" },
    { name: "Hafta", label: "ہفتہ", color: "from-indigo-500 to-indigo-600" }
  ]
  
  const currentDay = getCurrentDay()
  
  const loadDeliveryBoys = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await deliveryBoyService.getAll()
      setDeliveryBoys(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadDeliveryBoys()
  }, [])
  
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadDeliveryBoys} />
  
  const getDeliveryBoysForDay = (dayName) => {
    return deliveryBoys.filter(boy => boy.assignedDay === dayName)
  }
  
  const handleCallDeliveryBoy = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`, '_self')
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-2xl p-6 mb-8 text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="CalendarDays" className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
          ہفتہ وار کیلنڈر
        </h1>
        
        <p className="text-slate-600 max-w-2xl mx-auto">
          ہر دن کے لیے مقرر کردہ ڈیلیوری بوائے کی مکمل فہرست۔ 
          آج کا دن خاص طور پر نمایاں ہے۔
        </p>
      </motion.div>
      
      {/* Calendar Grid */}
      {deliveryBoys.length === 0 ? (
        <Empty
          title="کیلنڈر خالی ہے"
          subtitle="ابھی تک کوئی ڈیلیوری بوائے شامل نہیں کیا گیا"
          actionText="پہلا ڈیلیوری بوائے شامل کریں"
          actionPath="/add-delivery-boy"
          icon="CalendarDays"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {days.map((day, index) => {
            const dayDeliveryBoys = getDeliveryBoysForDay(day.name)
            const isToday = currentDay === day.name
            
            return (
              <motion.div
                key={day.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  glass-card rounded-2xl p-6 min-h-[300px]
                  ${isToday ? 'ring-4 ring-green-500/50 bg-gradient-to-r from-green-50/50 to-emerald-50/50' : ''}
                `}
              >
                {/* Day Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 bg-gradient-to-r ${day.color} rounded-full flex items-center justify-center`}>
                    <ApperIcon name="Calendar" className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <h3 className="font-bold text-slate-800">{day.label}</h3>
                    <p className="text-sm text-slate-600">{day.name}</p>
                  </div>
                  {isToday && (
                    <Badge variant="success" animate={true} size="small">
                      آج
                    </Badge>
                  )}
                </div>
                
                {/* Delivery Boys for this day */}
                <div className="space-y-3">
                  {dayDeliveryBoys.length === 0 ? (
                    <div className="text-center py-8">
                      <ApperIcon name="UserX" className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                      <p className="text-sm text-slate-500">
                        کوئی ڈیلیوری بوائے نہیں
                      </p>
                    </div>
                  ) : (
                    dayDeliveryBoys.map((deliveryBoy) => (
                      <motion.div
                        key={deliveryBoy.Id}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-white/30"
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                            <ApperIcon name="User" className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-800 text-sm">
                              {deliveryBoy.naam}
                            </h4>
                            <p className="text-xs text-slate-600">
                              {deliveryBoy.phoneNumber}
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                          {deliveryBoy.tafseelat}
                        </p>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCallDeliveryBoy(deliveryBoy.phoneNumber)}
                          className="w-full glass-button text-primary-600 font-semibold py-2 px-3 rounded-lg text-sm flex items-center justify-center space-x-2"
                        >
                          <ApperIcon name="Phone" className="w-4 h-4" />
                          <span>کال کریں</span>
                        </motion.button>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CalendarPage