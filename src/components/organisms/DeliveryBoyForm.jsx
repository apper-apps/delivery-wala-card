import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormField from '@/components/molecules/FormField'
import DaySelector from '@/components/molecules/DaySelector'
import Button from '@/components/atoms/Button'
import { deliveryBoyService } from '@/services/api/deliveryBoyService'

const DeliveryBoyForm = ({ deliveryBoy = null, onSuccess }) => {
  const navigate = useNavigate()
  const isEditing = !!deliveryBoy
  
  const [formData, setFormData] = useState({
    naam: deliveryBoy?.naam || '',
    phoneNumber: deliveryBoy?.phoneNumber || '',
    tafseelat: deliveryBoy?.tafseelat || '',
    assignedDay: deliveryBoy?.assignedDay || 'Somwar'
  })
  
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  
  const days = ["Aitwar", "Somwar", "Mangal", "Budh", "Jumeraat", "Jumma", "Hafta"]
  
  const handleFieldChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.naam.trim()) {
      newErrors.naam = 'نام ضروری ہے'
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'فون نمبر ضروری ہے'
    } else if (!/^\d{11}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'صحیح فون نمبر درج کریں'
    }
    
    if (!formData.tafseelat.trim()) {
      newErrors.tafseelat = 'تفصیلات ضروری ہیں'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    try {
      setLoading(true)
      
      if (isEditing) {
        await deliveryBoyService.update(deliveryBoy.Id, formData)
        toast.success('ڈیلیوری بوائے کی تفصیلات اپ ڈیٹ ہو گئیں')
      } else {
        await deliveryBoyService.create(formData)
        toast.success('نیا ڈیلیوری بوائے کامیابی سے شامل ہو گیا')
      }
      
      if (onSuccess) {
        onSuccess()
      } else {
        navigate('/schedule')
      }
      
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="glass-card rounded-2xl p-6 space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          {isEditing ? 'ڈیلیوری بوائے کی تفصیلات اپ ڈیٹ کریں' : 'نیا ڈیلیوری بوائے شامل کریں'}
        </h2>
        <p className="text-slate-600">
          {isEditing ? 'تفصیلات میں تبدیلی کریں' : 'ڈیلیوری بوائے کی تمام تفصیلات درج کریں'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="نام"
          name="naam"
          value={formData.naam}
          onChange={handleFieldChange}
          placeholder="ڈیلیوری بوائے کا نام درج کریں"
          error={errors.naam}
          icon="User"
          required
        />
        
        <FormField
          label="فون نمبر"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleFieldChange}
          placeholder="03xxxxxxxxx"
          error={errors.phoneNumber}
          icon="Phone"
          required
        />
      </div>
      
      <FormField
        label="تفصیلات"
        name="tafseelat"
        value={formData.tafseelat}
        onChange={handleFieldChange}
        placeholder="ڈیلیوری کی تفصیلات، علاقہ، یا خصوصی ہدایات"
        error={errors.tafseelat}
        icon="FileText"
        required
      />
      
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-4">
          ڈیلیوری کا دن منتخب کریں
          <span className="text-red-500 ml-1">*</span>
        </label>
        <DaySelector
          selectedDay={formData.assignedDay}
          onDayChange={(day) => handleFieldChange('assignedDay', day)}
          days={days}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button
          type="submit"
          variant="primary"
          icon={isEditing ? "Save" : "Plus"}
          disabled={loading}
          className="flex-1"
        >
          {loading
            ? 'محفوظ کر رہے ہیں...'
            : isEditing
              ? 'تبدیلیاں محفوظ کریں'
              : 'ڈیلیوری بوائے شامل کریں'
          }
        </Button>
        
        <Button
          type="button"
          variant="secondary"
          icon="X"
          onClick={() => navigate('/schedule')}
          className="flex-1 sm:flex-none"
        >
          منسوخ کریں
        </Button>
      </div>
    </motion.form>
  )
}

export default DeliveryBoyForm