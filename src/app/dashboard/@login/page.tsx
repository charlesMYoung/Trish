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
import { type ClientSafeProvider, type LiteralUnion, signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import AuthProvider from './auth-provider'
import { api } from '~/trpc/react'

export default function LoginModal() {
  const { onOpenChange } = useDisclosure()
  const [providers, setProviders] =
    useState<Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>>()

  const { mutate: insertLogMutate } = api.log.insertLog.useMutation()

  useEffect(() => {
    AuthProvider().then((p) => {
      p && setProviders(p)
    })
  }, [])

  const handleLogin = async (providerId: string) => {
    signIn(providerId)
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
                      handleLogin(provider.id)
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
