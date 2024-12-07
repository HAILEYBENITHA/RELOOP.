'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getRecyclingStatus, simulateRecyclingProcess } from '../actions'

export default function Dashboard() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const fetchStatus = async () => {
    setLoading(true)
    try {
      const result = await getRecyclingStatus(email)
      setStatus(result)
    } catch (error) {
      console.error('Error fetching status:', error)
    }
    setLoading(false)
  }

  const handleSimulate = async () => {
    setLoading(true)
    try {
      await simulateRecyclingProcess(email)
      await fetchStatus()
    } catch (error) {
      console.error('Error simulating process:', error)
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Recycling Dashboard</h1>
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={fetchStatus} disabled={loading} className="w-full sm:w-auto">
          {loading ? 'Loading...' : 'Fetch Status'}
        </Button>
      </div>
      {status && (
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-2xl font-semibold mb-4">Current Status: {status.currentStage}</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Pickup Scheduled</h3>
              <p>{status.pickupDate || 'Not scheduled'}</p>
            </div>
            <div>
              <h3 className="font-semibold">Estimated Completion</h3>
              <p>{status.estimatedCompletion || 'N/A'}</p>
            </div>
            <div>
              <h3 className="font-semibold">Recycled Product</h3>
              <p>{status.recycledProduct || 'Not yet determined'}</p>
            </div>
          </div>
          <Button className="mt-4" onClick={handleSimulate} disabled={loading}>
            {loading ? 'Processing...' : 'Simulate Recycling Process'}
          </Button>
        </div>
      )}
    </div>
  )
}

