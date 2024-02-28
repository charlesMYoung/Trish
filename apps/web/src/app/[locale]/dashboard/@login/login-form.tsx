'use client'

import { Icon } from '@iconify/react'
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import { type BuiltInProviderType } from 'next-auth/providers/index'
import {
  signIn,
  type ClientSafeProvider,
  type LiteralUnion,
} from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import AuthProvider from './auth-provider'

export const LoginForm = () => {
  const [providers, setProviders] =
    useState<Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>>()
  const t = useTranslations('Login')
  const search = useSearchParams()
  const errorMsg = search.get('error')

  useEffect(() => {
    void AuthProvider().then((p) => {
      p && setProviders(p)
    })
  }, [])

  const errorMessage = useMemo(() => {
    switch (errorMsg) {
      case 'OAuthSignin':
        return t('OAuthSignin')
      case 'OAuthCallback':
        return t('OAuthCallback')
      case 'OAuthCreateAccount':
        return t('OAuthCreateAccount')
      case 'CallBack':
        return t('CallBack')
      case 'OAuthAccountNotLinked':
        return t('OAuthAccountNotLinked')
      case 'EmailSignin':
        return t('EmailSignin')
      case 'CredentialsSignin':
        return t('CredentialsSignin')
      case 'SessionRequired':
        return t('SessionRequired')
      case 'Default':
        return t('Default')
    }
  }, [errorMsg])

  async function handleLogin(id: string | (string & Record<never, never>)) {
    await signIn(id)
  }

  return (
    <div className="flex flex-col w-96 space-y-4">
      {errorMsg ? (
        <Card>
          <CardBody className="bg-danger-500 text-danger-900">
            <p>{errorMessage}</p>
          </CardBody>
        </Card>
      ) : (
        []
      )}
      <Card>
        <CardHeader>{t('title')}</CardHeader>
        <CardBody className="space-y-4">
          {providers &&
            Object.values(providers).map((provider) => (
              <Button
                key={provider.id}
                href={provider.signinUrl}
                className="w-full"
                variant="ghost"
                onPress={() => {
                  void handleLogin(provider.id)
                }}
                startContent={
                  <Icon
                    icon="mdi:github"
                    className="text-default-500 text-lg"
                  />
                }
              >
                {t('login-submit', {
                  provider: provider.name,
                })}
              </Button>
            ))}
        </CardBody>
      </Card>
    </div>
  )
}
