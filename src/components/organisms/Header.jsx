import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'گھر', icon: 'Home' },
    { path: '/schedule', label: 'شیڈول', icon: 'Calendar' },
    { path: '/add-delivery-boy', label: 'نیا بندا', icon: 'UserPlus' },
    { path: '/calendar', label: 'کیلنڈر', icon: 'CalendarDays' }
  ]
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  return (
    <>
      {/* Desktop Header */}
      <header className="glass-header sticky top-0 z-40 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="Truck" className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">Delivery Wala</span>
            </Link>
            
            {/* Navigation */}
            <nav className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                    ${location.pathname === item.path
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                      : 'text-slate-700 hover:bg-white/30'
                    }
                  `}
                >
                  <ApperIcon name={item.icon} className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
      
      {/* Mobile Header */}
      <header className="glass-header sticky top-0 z-40 md:hidden">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="Truck" className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-800">Delivery Wala</span>
            </Link>
            
            <button
              onClick={toggleMobileMenu}
              className="glass-button p-2 rounded-lg"
            >
              <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-white/30 shadow-xl"
          >
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200
                    ${location.pathname === item.path
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                      : 'text-slate-700 hover:bg-white/50'
                    }
                  `}
                >
                  <ApperIcon name={item.icon} className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </header>
      
      {/* Mobile Bottom Navigation */}
      <div className="mobile-nav md:hidden">
        <nav className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200
                ${location.pathname === item.path
                  ? 'text-primary-600'
                  : 'text-slate-600 hover:text-primary-500'
                }
              `}
            >
              <ApperIcon name={item.icon} className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

export default Header