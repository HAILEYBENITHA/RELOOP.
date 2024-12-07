'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { schedulePickup } from '../actions'

export default function SchedulePickup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    wasteDescription: ''
  })
  const [confirmation, setConfirmation] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await schedulePickup(formData)
    if (result.success) {
      setConfirmation(`Pickup scheduled successfully! Your pickup ID is: ${result.pickupId}`)
      setFormData({ name: '', email: '', address: '', wasteDescription: '' })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Schedule a Pickup</h1>
      {confirmation && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{confirmation}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="wasteDescription">Waste Description</Label>
          <Textarea id="wasteDescription" name="wasteDescription" value={formData.wasteDescription} onChange={handleChange} required />
        </div>
        <Button type="submit">Schedule Pickup</Button>
      </form>
    </div>
  )
}

