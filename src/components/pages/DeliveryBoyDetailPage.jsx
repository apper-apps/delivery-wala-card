import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import DeliveryBoyForm from '@/components/organisms/DeliveryBoyForm'
import { deliveryBoyService } from '@/services/api/deliveryBoyService'
import { calculateDaysUntilNext, getCurrentDay } from '@/utils/dateUtils'

const DeliveryBoyDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [deliveryBoy, setDeliveryBoy] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  
  const loadDeliveryBoy = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await deliveryBoyService.getById(parseInt(id))
      setDeliveryBoy(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadDeliveryBoy()
  }, [id])
  
  const handleCall = () => {
    window.open(`tel:${deliveryBoy.phoneNumber}`, '_self')
  }
  
  const handleEdit = () => {
    setIsEditing(true)
  }
  
  const handleEditSuccess = () => {
    setIsEditing(false)
    loadDeliveryBoy()
  }
  
  const handleDelete = async () => {
    try {
      await deliveryBoyService.delete(parseInt(id))
      toast.success('ڈیلیوری بوائے کامیابی سے ہٹا دیا گیا')
      navigate('/schedule')
    } catch (err) {
      toast.error(err.message)
    }
  }
  
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadDeliveryBoy} />
  if (!deliveryBoy) return <Error message="ڈیلیوری بوائے نہیں ملا" />
  
  const daysUntil = calculateDaysUntilNext(deliveryBoy.assignedDay)
  const currentDay = getCurrentDay()
  const isToday = deliveryBoy.assignedDay === currentDay
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {isEditing ? (
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6 mb-8 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Edit" className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
              ڈیلیوری بوائے کی تفصیلات اپ ڈیٹ کریں
            </h1>
            <p className="text-slate-600">
              {deliveryBoy.naam} کی تفصیلات میں تبدیلی کریں
            </p>
          </motion.div>
          
          <DeliveryBoyForm
            deliveryBoy={deliveryBoy}
            onSuccess={handleEditSuccess}
          />
        </div>
      ) : (
        <>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <Button
                icon="ArrowLeft"
                variant="glass"
                onClick={() => navigate('/schedule')}
              >
                واپس
              </Button>
              
              {isToday && (
                <Badge variant="success" animate={true}>
                  آج کا دن
                </Badge>
              )}
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                <ApperIcon name="User" className="w-12 h-12 text-white" />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                  {deliveryBoy.naam}
                </h1>
                <p className="text-slate-600 mb-4">
                  {deliveryBoy.tafseelat}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Phone" className="w-5 h-5 text-primary-600" />
                    <span className="font-semibold text-slate-800">
                      {deliveryBoy.phoneNumber}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Calendar" className="w-5 h-5 text-primary-600" />
                    <span className="font-semibold text-slate-800">
                      {deliveryBoy.assignedDay}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Countdown Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`
              glass-card rounded-2xl p-8 mb-8 text-center
              ${isToday ? 'bg-gradient-to-r from-green-50/50 to-emerald-50/50 border-2 border-green-200/50' : ''}
            `}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Clock" className="w-8 h-8 text-white" />
            </div>
            
            {isToday ? (
              <div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">
                  آج ڈیلیوری کا دن ہے!
                </h2>
                <p className="text-slate-600 mb-6">
                  {deliveryBoy.naam} آج آپ کے پاس آئے گا
                </p>
                <Button
                  icon="Phone"
                  variant="primary"
                  size="large"
                  onClick={handleCall}
                  className="animate-bounce-gentle"
                >
                  ابھی کال کریں
                </Button>
              </div>
            ) : (
              <div>
                <div className="countdown-number mb-2">{daysUntil}</div>
                <p className="text-slate-600 mb-6">
                  دن بعد {deliveryBoy.naam} آپ کے پاس آئے گا
                </p>
                <Button
                  icon="Phone"
                  variant="secondary"
                  size="large"
                  onClick={handleCall}
                >
                  کال کریں
                </Button>
              </div>
            )}
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl p-6"
          >
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              اعمال
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                icon="Edit"
                variant="primary"
                onClick={handleEdit}
                className="w-full"
              >
                تفصیلات اپ ڈیٹ کریں
              </Button>
              
              <Button
                icon="Phone"
                variant="secondary"
                onClick={handleCall}
                className="w-full"
              >
                کال کریں
              </Button>
              
              <Button
                icon="Calendar"
                variant="glass"
                onClick={() => navigate('/calendar')}
                className="w-full"
              >
                کیلنڈر دیکھیں
              </Button>
              
              <Button
                icon="Trash2"
                variant="outline"
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full border-red-300 text-red-600 hover:bg-red-50"
              >
                ہٹائیں
              </Button>
            </div>
          </motion.div>
          
          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-card rounded-2xl p-6 max-w-md w-full"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="AlertTriangle" className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    تصدیق کریں
                  </h3>
                  
                  <p className="text-slate-600 mb-6">
                    کیا آپ واقعی {deliveryBoy.naam} کو ہٹانا چاہتے ہیں؟ 
                    یہ عمل واپس نہیں ہو سکتا۔
                  </p>
                  
                  <div className="flex gap-4">
                    <Button
                      icon="Trash2"
                      variant="outline"
                      onClick={handleDelete}
                      className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                    >
                      ہاں، ہٹائیں
                    </Button>
                    <Button
                      icon="X"
                      variant="secondary"
                      onClick={() => setShowDeleteConfirm(false)}
                      className="flex-1"
                    >
                      منسوخ کریں
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </>
      )}
    </div>
  )
}

export default DeliveryBoyDetailPage