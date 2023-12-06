'use client'

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
  useDisclosure,
} from '@nextui-org/react'
import { BackgroundPanel } from './background-panel'

export const CoverModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col">
                  <Tabs aria-label="Options">
                    <Tab key="photos" title="通用">
                      <BackgroundPanel/>
                    </Tab>
                    <Tab key="upload" title="上传">
                      2
                    </Tab>
                    <Tab key="link" title="链接">
                      3
                    </Tab>
                  </Tabs>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
