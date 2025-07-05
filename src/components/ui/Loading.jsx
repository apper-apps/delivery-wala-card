import React from 'react'
import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="glass-card rounded-2xl p-6 mb-8 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-48"></div>
            <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-32"></div>
          </div>
          <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-full mb-2"></div>
          <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-3/4"></div>
        </div>

        {/* Today's Delivery Skeleton */}
        <div className="glass-card rounded-2xl p-6 mb-8 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full"></div>
              <div>
                <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-32 mb-2"></div>
                <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-24"></div>
              </div>
            </div>
            <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full w-24"></div>
          </div>
        </div>

        {/* Delivery Boys Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: item * 0.1 }}
              className="glass-card rounded-2xl p-6 animate-pulse"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-12 w-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-full mb-2"></div>
                  <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-3/4"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-full"></div>
                <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-5/6"></div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-20"></div>
                <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-16"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loading