import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import HomePage from '@/components/pages/HomePage'
import SchedulePage from '@/components/pages/SchedulePage'
import AddDeliveryBoyPage from '@/components/pages/AddDeliveryBoyPage'
import CalendarPage from '@/components/pages/CalendarPage'
import DeliveryBoyDetailPage from '@/components/pages/DeliveryBoyDetailPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/add-delivery-boy" element={<AddDeliveryBoyPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/delivery-boy/:id" element={<DeliveryBoyDetailPage />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </>
  )
}

export default App