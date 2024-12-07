import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await request.json()
  
  // Here you would typically save the data to a database
  console.log('Received pickup request:', data)

  // Simulate sending an email
  console.log(`Sending confirmation email to ${data.email}`)

  return NextResponse.json({ message: 'Pickup request received' }, { status: 200 })
}

