'use server'

import { getProviders } from 'next-auth/react'

export default function GetAuthProviders() {
  return getProviders()
}
