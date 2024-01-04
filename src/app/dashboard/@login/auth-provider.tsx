'use server'

import { getProviders } from 'next-auth/react'

export default async () => {
  const providers = await getProviders()
  return providers
}
