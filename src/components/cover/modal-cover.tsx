'use client'

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  Tab,
  Tabs,
} from '@nextui-org/react'
import { BackgroundPanel } from './background-panel'

export type CoverCloseParam = {
  key?: string
  data?: Record<string, unknown>
}

export type CoverModalProps = {
  isOpen: boolean
  onCloseChange?: (param: CoverCloseParam) => void
}

export const CoverModal = ({ isOpen, onCloseChange }: CoverModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} placement="top" size="3xl" backdrop="blur">
        <ModalContent>
          <ModalBody className="flex w-full flex-col items-center">
            <Tabs aria-label="Options">
              <Tab key="photos" title="通用">
                <BackgroundPanel
                  onChosen={(value) => {
                    onCloseChange &&
                      onCloseChange({
                        key: 'photos',
                        data: value,
                      })
                  }}
                />
              </Tab>
              <Tab key="upload" title="上传">
                <Button>upload</Button>
              </Tab>
              <Tab key="link" title="链接">
                <Input endContent={<Button>链接</Button>}></Input>
              </Tab>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
