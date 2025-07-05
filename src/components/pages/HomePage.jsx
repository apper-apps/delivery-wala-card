import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { deliveryBoyService } from '@/services/api/deliveryBoyService'
import { getCurrentDay, calculateDaysUntilNext } from '@/utils/dateUtils'

const HomePage = () => {
  const [deliveryBoys, setDeliveryBoys] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
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
  
  const todayDeliveryBoy = deliveryBoys.find(boy => boy.assignedDay === currentDay)
  const totalDeliveryBoys = deliveryBoys.length
  const upcomingDeliveries = deliveryBoys.filter(boy => {
    const daysUntil = calculateDaysUntilNext(boy.assignedDay)
    return daysUntil > 0 && daysUntil <= 3
  })
  
  const handleCallToday = () => {
    if (todayDeliveryBoy) {
      window.open(`tel:${todayDeliveryBoy.phoneNumber}`, '_self')
    }
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card rounded-2xl p-8 mb-8 text-center"
      >
        <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="Truck" className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          Delivery Wala میں خوش آمدید
        </h1>
        
        <p className="text-slate-600 text-lg mb-6 max-w-2xl mx-auto">
          آپ کے سپر اسٹور کے لیے ڈیلیوری بوائے کا مکمل انتظام۔ 
          آسان، تیز اور موثر طریقے سے اپنے ڈیلیوری شیڈول کو منظم کریں۔
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/schedule">
            <Button icon="Calendar" size="large">
              ڈیلیوری شیڈول دیکھیں
            </Button>
          </Link>
          <Link to="/add-delivery-boy">
            <Button variant="secondary" icon="UserPlus" size="large">
              نیا ڈیلیوری بوائے شامل کریں
            </Button>
          </Link>
        </div>
      </motion.div>
      
      {/* Today's Delivery Highlight */}
      {todayDeliveryBoy ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6 mb-8 bg-gradient-to-r from-green-50/50 to-emerald-50/50 border-2 border-green-200/50"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Calendar" className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-slate-800">آج کا ڈیلیوری بوائے</h2>
            </div>
            <Badge variant="success" animate={true}>
              {currentDay}
            </Badge>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <ApperIcon name="User" className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">{todayDeliveryBoy.naam}</h3>
                <p className="text-slate-600">{todayDeliveryBoy.tafseelat}</p>
                <p className="text-green-600 font-semibold">{todayDeliveryBoy.phoneNumber}</p>
              </div>
            </div>
            
            <Button
              icon="Phone"
              variant="primary"
              size="large"
              onClick={handleCallToday}
              className="animate-bounce-gentle"
            >
              ابھی کال کریں
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6 mb-8 text-center"
        >
          <ApperIcon name="Calendar" className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">آج کوئی ڈیلیوری نہیں</h2>
          <p className="text-slate-600 mb-4">
            آج ({currentDay}) کے لیے کوئی ڈیلیوری بوائے مقرر نہیں ہے
          </p>
          <Link to="/add-delivery-boy">
            <Button icon="Plus" variant="primary">
              ڈیلیوری بوائے شامل کریں
            </Button>
          </Link>
        </motion.div>
      )}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6 text-center"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Users" className="w-6 h-6 text-white" />
          </div>
          <div className="countdown-number mb-2">{totalDeliveryBoys}</div>
          <p className="text-slate-600">کل ڈیلیوری بوائے</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6 text-center"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="CheckCircle" className="w-6 h-6 text-white" />
          </div>
          <div className="countdown-number mb-2">{todayDeliveryBoy ? 1 : 0}</div>
          <p className="text-slate-600">آج کے ڈیلیوری</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6 text-center"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Clock" className="w-6 h-6 text-white" />
          </div>
          <div className="countdown-number mb-2">{upcomingDeliveries.length}</div>
          <p className="text-slate-600">آنے والے ڈیلیوری</p>
        </motion.div>
      </div>
      
      {/* Upcoming Deliveries */}
      {upcomingDeliveries.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center space-x-2">
            <ApperIcon name="Clock" className="w-6 h-6 text-primary-600" />
            <span>آنے والے ڈیلیوری (3 دن میں)</span>
          </h2>
          
          <div className="space-y-4">
            {upcomingDeliveries.map((deliveryBoy, index) => {
              const daysUntil = calculateDaysUntilNext(deliveryBoy.assignedDay)
              return (
                <motion.div
                  key={deliveryBoy.Id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white/50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                      <ApperIcon name="User" className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{deliveryBoy.naam}</h3>
                      <p className="text-sm text-slate-600">{deliveryBoy.assignedDay}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary-600">{daysUntil}</div>
                    <div className="text-xs text-slate-500">دن بعد</div>
                  </div>
                </motion.div>
              )
            })}
          </div>
          
          <div className="mt-6 text-center">
            <Link to="/schedule">
              <Button icon="Calendar" variant="secondary">
                تمام ڈیلیوری دیکھیں
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default HomePage