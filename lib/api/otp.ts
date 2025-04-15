// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Get OTP for a number
export async function getOtp(number: string): Promise<{ otp: string; expiresAt: Date }> {
  await delay(2000) // Simulate API delay

  // Generate random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString()

  // Set expiry time (10 minutes from now)
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

  return { otp, expiresAt }
}
