'use server'

import { store } from './lib/store'
import { sendEmail } from './lib/email'

export async function schedulePickup(formData: {
  name: string
  email: string
  address: string
  wasteDescription: string
}) {
  const pickupId = store.addPickup(formData)

  // Send a confirmation email
  await sendEmail(formData.email, 'Pickup Scheduled', `Your pickup has been scheduled. Your pickup ID is: ${pickupId}`)

  return { success: true, pickupId }
}

export async function getRecyclingStatus(email: string) {
  const status = store.getPickupByEmail(email)
  
  if (!status) {
    return {
      currentStage: 'No pickup scheduled',
      pickupDate: null,
      estimatedCompletion: null,
      recycledProduct: null
    }
  }

  return {
    currentStage: status.status,
    pickupDate: new Date(status.pickupDate).toDateString(),
    estimatedCompletion: new Date(status.estimatedCompletion).toDateString(),
    recycledProduct: status.recycledProduct
  }
}

// Simulate the recycling process and send updates
export async function simulateRecyclingProcess(email: string) {
  const stages = ['Collected', 'Sorting', 'Processing', 'Manufacturing', 'Quality Check', 'Ready for Delivery']
  
  for (const stage of stages) {
    await new Promise(resolve => setTimeout(resolve, 5000)) // Wait 5 seconds between stages
    store.updatePickupStatus(email, stage)
    await sendEmail(email, 'Recycling Update', `Your item is now in the ${stage} stage.`)
  }

  store.updatePickupStatus(email, 'Completed', 'Eco-friendly packaging')
  await sendEmail(email, 'Recycling Complete', 'Your recycled item is ready for delivery!')
}

