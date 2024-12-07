'use server'

import { kv } from '@vercel/kv'
import { sendEmail } from './lib/email'

export async function schedulePickup(formData: {
  name: string
  email: string
  address: string
  wasteDescription: string
}) {
  const pickupId = Date.now().toString()
  const pickup = {
    ...formData,
    id: pickupId,
    status: 'Scheduled',
    pickupDate: new Date().toISOString(),
    estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    recycledProduct: null,
  }

  await kv.set(`pickup:${formData.email}`, JSON.stringify(pickup))

  // Send a confirmation email
  await sendEmail(formData.email, 'Pickup Scheduled', `Your pickup has been scheduled. Your pickup ID is: ${pickupId}`)

  return { success: true, pickupId }
}

export async function getRecyclingStatus(email: string) {
  const pickup = await kv.get(`pickup:${email}`)
  
  if (!pickup) {
    return {
      currentStage: 'No pickup scheduled',
      pickupDate: null,
      estimatedCompletion: null,
      recycledProduct: null
    }
  }

  const status = JSON.parse(pickup as string)

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
    await updatePickupStatus(email, stage)
    await sendEmail(email, 'Recycling Update', `Your item is now in the ${stage} stage.`)
  }

  await updatePickupStatus(email, 'Completed', 'Eco-friendly packaging')
  await sendEmail(email, 'Recycling Complete', 'Your recycled item is ready for delivery!')
}

async function updatePickupStatus(email: string, status: string, recycledProduct?: string) {
  const pickupStr = await kv.get(`pickup:${email}`)
  if (pickupStr) {
    const pickup = JSON.parse(pickupStr as string)
    pickup.status = status
    if (recycledProduct) {
      pickup.recycledProduct = recycledProduct
    }
    await kv.set(`pickup:${email}`, JSON.stringify(pickup))
  }
}

