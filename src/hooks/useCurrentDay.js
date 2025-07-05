import { useState, useEffect } from 'react'
import { getCurrentDay } from '@/utils/dateUtils'

export const useCurrentDay = () => {
  const [currentDay, setCurrentDay] = useState(getCurrentDay())
  
  useEffect(() => {
    // Update current day at midnight
    const updateCurrentDay = () => {
      setCurrentDay(getCurrentDay())
    }
    
    // Calculate milliseconds until next midnight
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(now.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    const msUntilMidnight = tomorrow.getTime() - now.getTime()
    
    // Set timeout for midnight, then interval for every 24 hours
    const timeoutId = setTimeout(() => {
      updateCurrentDay()
      const intervalId = setInterval(updateCurrentDay, 24 * 60 * 60 * 1000)
      
      return () => clearInterval(intervalId)
    }, msUntilMidnight)
    
    return () => clearTimeout(timeoutId)
  }, [])
  
  return currentDay
}