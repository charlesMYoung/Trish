'use server'

import { getProviders } from 'next-auth/react'

export default async function GetAuthProviders() {
  return getProviders()
}
