export const getCurrentDay = () => {
  const days = ["Aitwar", "Somwar", "Mangal", "Budh", "Jumeraat", "Jumma", "Hafta"]
  const today = new Date()
  const dayIndex = today.getDay()
  return days[dayIndex]
}

export const calculateDaysUntilNext = (assignedDay) => {
  const days = ["Aitwar", "Somwar", "Mangal", "Budh", "Jumeraat", "Jumma", "Hafta"]
  const today = new Date()
  const currentDayIndex = today.getDay()
  const assignedDayIndex = days.indexOf(assignedDay)
  
  if (assignedDayIndex === -1) return 0
  
  if (assignedDayIndex === currentDayIndex) {
    return 0 // Today
  }
  
  let daysUntil = assignedDayIndex - currentDayIndex
  if (daysUntil < 0) {
    daysUntil += 7 // Next week
  }
  
  return daysUntil
}

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('ur-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

export const isToday = (assignedDay) => {
  return getCurrentDay() === assignedDay
}

export const getNextOccurrence = (assignedDay) => {
  const days = ["Aitwar", "Somwar", "Mangal", "Budh", "Jumeraat", "Jumma", "Hafta"]
  const today = new Date()
  const currentDayIndex = today.getDay()
  const assignedDayIndex = days.indexOf(assignedDay)
  
  if (assignedDayIndex === -1) return null
  
  const nextDate = new Date(today)
  let daysToAdd = assignedDayIndex - currentDayIndex
  
  if (daysToAdd <= 0) {
    daysToAdd += 7
  }
  
  nextDate.setDate(today.getDate() + daysToAdd)
  return nextDate
}