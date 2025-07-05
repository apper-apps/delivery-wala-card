import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import DeliveryBoyCard from '@/components/molecules/DeliveryBoyCard'
import SearchBar from '@/components/molecules/SearchBar'
import DaySelector from '@/components/molecules/DaySelector'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { deliveryBoyService } from '@/services/api/deliveryBoyService'
import { getCurrentDay } from '@/utils/dateUtils'

const DeliveryBoyList = ({ searchTerm: externalSearchTerm = '' }) => {
  const [deliveryBoys, setDeliveryBoys] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDay, setSelectedDay] = useState('All')
  
  // Use external search term if provided, otherwise use internal
  const activeSearchTerm = externalSearchTerm || searchTerm
  const days = ["All", "Aitwar", "Somwar", "Mangal", "Budh", "Jumeraat", "Jumma", "Hafta"]
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
  
const filteredDeliveryBoys = deliveryBoys.filter(boy => {
    const matchesSearch = boy.naam.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
                         boy.phoneNumber.includes(activeSearchTerm) ||
                         boy.assignedDay.toLowerCase().includes(activeSearchTerm.toLowerCase())
    
    const matchesDay = selectedDay === 'All' || boy.assignedDay === selectedDay
    
    return matchesSearch && matchesDay
  })
  
  // Sort to show today's delivery boy first
  const sortedDeliveryBoys = [...filteredDeliveryBoys].sort((a, b) => {
    if (a.assignedDay === currentDay && b.assignedDay !== currentDay) return -1
    if (a.assignedDay !== currentDay && b.assignedDay === currentDay) return 1
    return 0
  })
  
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadDeliveryBoys} />
  
return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        {!externalSearchTerm && (
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="نام، فون نمبر، یا دن سے تلاش کریں..."
          />
        )}
        
        <DaySelector
          selectedDay={selectedDay}
          onDayChange={setSelectedDay}
          days={days}
        />
      </div>
      
      {/* Results */}
      {sortedDeliveryBoys.length === 0 ? (
        <Empty
          title="کوئی ڈیلیوری بوائے نہیں ملے"
          subtitle="آپ کی تلاش کے لیے کوئی نتیجہ نہیں ملا"
          actionText="نیا ڈیلیوری بوائے شامل کریں"
          actionPath="/add-delivery-boy"
          icon="Search"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDeliveryBoys.map((deliveryBoy, index) => (
            <DeliveryBoyCard
              key={deliveryBoy.Id}
              deliveryBoy={deliveryBoy}
              isToday={deliveryBoy.assignedDay === currentDay}
              delay={index * 0.1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default DeliveryBoyList