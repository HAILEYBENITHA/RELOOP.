export async function sendEmail(to: string, subject: string, body: string) {
  // In a real app, you would integrate with an email service provider
  console.log(`Sending email to ${to}`)
  console.log(`Subject: ${subject}`)
  console.log(`Body: ${body}`)
  
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return { success: true }
}

