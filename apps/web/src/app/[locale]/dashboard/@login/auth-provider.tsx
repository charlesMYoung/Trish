'use server'

import { getProviders } from 'next-auth/react'

export default async function getAuthProviders() {
  return getProviders()
}
