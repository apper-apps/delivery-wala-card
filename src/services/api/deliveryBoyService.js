import deliveryBoysData from '@/services/mockData/deliveryBoys.json'

class DeliveryBoyService {
  constructor() {
    this.deliveryBoys = [...deliveryBoysData]
  }
  
  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...this.deliveryBoys]
  }
  
  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const deliveryBoy = this.deliveryBoys.find(boy => boy.Id === id)
    if (!deliveryBoy) {
      throw new Error('ڈیلیوری بوائے نہیں ملا')
    }
    return { ...deliveryBoy }
  }
  
  async create(deliveryBoyData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    // Find the highest existing Id and add 1
    const maxId = this.deliveryBoys.reduce((max, boy) => Math.max(max, boy.Id), 0)
    const newDeliveryBoy = {
      Id: maxId + 1,
      ...deliveryBoyData,
      createdAt: new Date().toISOString()
    }
    
    this.deliveryBoys.push(newDeliveryBoy)
    return { ...newDeliveryBoy }
  }
  
  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = this.deliveryBoys.findIndex(boy => boy.Id === id)
    if (index === -1) {
      throw new Error('ڈیلیوری بوائے نہیں ملا')
    }
    
    this.deliveryBoys[index] = {
      ...this.deliveryBoys[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    return { ...this.deliveryBoys[index] }
  }
  
  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = this.deliveryBoys.findIndex(boy => boy.Id === id)
    if (index === -1) {
      throw new Error('ڈیلیوری بوائے نہیں ملا')
    }
    
    this.deliveryBoys.splice(index, 1)
    return { success: true }
  }
  
  async getByDay(day) {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.deliveryBoys.filter(boy => boy.assignedDay === day)
  }
}

export const deliveryBoyService = new DeliveryBoyService()