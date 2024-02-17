'use client'

import { Icon } from '@iconify/react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from '@nextui-org/react'
import { type BuiltInProviderType } from 'next-auth/providers/index'
import {
  signIn,
  type ClientSafeProvider,
  type LiteralUnion,
} from 'next-auth/react'
import { useEffect, useState } from 'react'
import AuthProvider from './auth-provider'

export const LoginForm = () => {
  const [providers, setProviders] =
    useState<Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>>()
  useEffect(() => {
    void AuthProvider().then((p) => {
      p && setProviders(p)
    })
  }, [])

  async function handleLogin(id: string | (string & Record<never, never>)) {
    await signIn(id)
  }

  return (
    <Card>
      <CardHeader>欢迎回来！</CardHeader>
      <CardBody className="space-y-4">
        <Input
          type="email"
          label="Email"
          placeholder="you@example.com"
          labelPlacement="outside"
          startContent={
            <Icon
              icon="bx:bxs-envelope"
              className="text-default-500 text-medium"
            />
          }
        />
        <Button className="w-full" variant="shadow" color="primary">
          通过邮箱登录
        </Button>
        <div className="flex space-x-1 items-center">
          <Divider className="flex-1" />
          <span className="text-sm text-default-500">或者</span>
          <Divider className="flex-1" />
        </div>
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
                <Icon icon="mdi:github" className="text-default-500 text-lg" />
              }
            >
              使用 {provider.name} 登录
            </Button>
          ))}
      </CardBody>
    </Card>
  )
}
