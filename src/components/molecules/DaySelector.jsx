import React from 'react'
import { motion } from 'framer-motion'

const DaySelector = ({ 
  selectedDay, 
  onDayChange, 
  days = ["Aitwar", "Somwar", "Mangal", "Budh", "Jumeraat", "Jumma", "Hafta"],
  className = "" 
}) => {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 ${className}`}>
      {days.map((day) => (
        <motion.button
          key={day}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDayChange(day)}
          className={`
            px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200
            ${selectedDay === day
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
              : 'bg-white/50 backdrop-blur-sm text-slate-700 hover:bg-white/70'
            }
          `}
        >
          {day}
        </motion.button>
      ))}
    </div>
  )
}

export default DaySelector