import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import DeliveryBoyList from "@/components/organisms/DeliveryBoyList";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";

const SchedulePage = () => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-2xl p-6 mb-8"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <ApperIcon name="Calendar" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                ڈیلیوری شیڈول
              </h1>
              <p className="text-slate-600">
                تمام ڈیلیوری بوائے کی فہرست اور ان کے اوقات
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/add-delivery-boy">
              <Button icon="UserPlus" variant="primary">
                نیا ڈیلیوری بوائے
              </Button>
            </Link>
            <Link to="/calendar">
              <Button icon="CalendarDays" variant="secondary">
                کیلنڈر ویو
              </Button>
</Link>
          </div>
        </div>
      </motion.div>
      
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card rounded-2xl p-6 mb-8"
      >
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Delivery Boy Ka Naam Ya Phone Number Dhoondhein."
        />
      </motion.div>
      
      {/* Delivery Boys List */}
      <DeliveryBoyList searchTerm={searchTerm} />
    </div>
  )

export default SchedulePage