'use client'

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { type BuiltInProviderType } from 'next-auth/providers/index'
import {
  signIn,
  type ClientSafeProvider,
  type LiteralUnion,
} from 'next-auth/react'
import { useEffect, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { api } from '~/trpc/react'
import AuthProvider from './auth-provider'

export default function LoginModal() {
  const { onOpenChange } = useDisclosure()
  const [providers, setProviders] =
    useState<Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>>()

  const { mutate: insertLogMutate } = api.log.insertLog.useMutation()

  useEffect(() => {
    void AuthProvider().then((p) => {
      p && setProviders(p)
    })
  }, [])

  const handleLogin = async (providerId: string) => {
    await signIn(providerId)
    insertLogMutate({
      level: 'info',
      message: `登录成功`,
      user_id: providerId,
    })
  }

  return (
    <Modal isOpen={true} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              登录
            </ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter className="flex flex-col">
              {providers &&
                Object.values(providers).map((provider) => (
                  <Button
                    key={provider.id}
                    href={provider.signinUrl}
                    color="secondary"
                    className="w-full"
                    variant="shadow"
                    onPress={() => {
                      void handleLogin(provider.id)
                    }}
                    startContent={<FaGithub />}
                  >
                    使用 {provider.name} 登录
                  </Button>
                ))}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
