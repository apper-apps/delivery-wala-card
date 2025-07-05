import { useState, useEffect } from 'react'
import { deliveryBoyService } from '@/services/api/deliveryBoyService'

export const useDeliveryBoys = () => {
  const [deliveryBoys, setDeliveryBoys] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
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
  
  const createDeliveryBoy = async (deliveryBoyData) => {
    try {
      const newDeliveryBoy = await deliveryBoyService.create(deliveryBoyData)
      setDeliveryBoys(prev => [...prev, newDeliveryBoy])
      return newDeliveryBoy
    } catch (err) {
      throw err
    }
  }
  
  const updateDeliveryBoy = async (id, updates) => {
    try {
      const updatedDeliveryBoy = await deliveryBoyService.update(id, updates)
      setDeliveryBoys(prev => prev.map(boy => 
        boy.Id === id ? updatedDeliveryBoy : boy
      ))
      return updatedDeliveryBoy
    } catch (err) {
      throw err
    }
  }
  
  const deleteDeliveryBoy = async (id) => {
    try {
      await deliveryBoyService.delete(id)
      setDeliveryBoys(prev => prev.filter(boy => boy.Id !== id))
    } catch (err) {
      throw err
    }
  }
  
  useEffect(() => {
    loadDeliveryBoys()
  }, [])
  
  return {
    deliveryBoys,
    loading,
    error,
    refresh: loadDeliveryBoys,
    create: createDeliveryBoy,
    update: updateDeliveryBoy,
    delete: deleteDeliveryBoy
  }
}