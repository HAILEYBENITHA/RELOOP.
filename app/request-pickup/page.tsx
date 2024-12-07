'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RequestPickup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    wasteType: '',
    quantity: '',
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/request-pickup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      router.push('/dashboard')
    } else {
      alert('There was an error submitting your request. Please try again.')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Request a Pickup</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="address" className="block mb-1">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>
        <div>
          <label htmlFor="wasteType" className="block mb-1">Waste Type</label>
          <select
            id="wasteType"
            name="wasteType"
            value={formData.wasteType}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select a waste type</option>
            <option value="plastic">Plastic</option>
            <option value="paper">Paper</option>
            <option value="electronics">Electronics</option>
            <option value="metal">Metal</option>
            <option value="glass">Glass</option>
          </select>
        </div>
        <div>
          <label htmlFor="quantity" className="block mb-1">Quantity (in kg)</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
          Submit Request
        </button>
      </form>
    </div>
  )
}

