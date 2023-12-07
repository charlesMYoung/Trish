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
import { ChangeEventHandler, useState } from 'react'
import { IoCloudUpload } from 'react-icons/io5'
import { Upload } from '../upload-button/upload-button'
import { BackgroundPanel } from './background-panel'

export enum CoverTabEnum {
  upload = 'upload',
  photos = 'photos',
  link = 'link',
}

export type CoverCloseParam = {
  key?: CoverTabEnum
  coverUrl?: string
}

export type CoverModalProps = {
  isOpen: boolean
  onCloseChange?: (param: CoverCloseParam) => void
  onOpenChange: (isOpen: boolean) => void
}

export const CoverModal = ({
  isOpen,
  onCloseChange,
  onOpenChange,
}: CoverModalProps) => {
  const [linkInput, setLinkInput] = useState<string>()
  const onLinkInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target?.value
    setLinkInput(value)
  }
  return (
    <Modal
      isOpen={isOpen}
      placement="top"
      size="3xl"
      backdrop="blur"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalBody className="flex w-full flex-col items-center">
          <Tabs aria-label="Options">
            <Tab key="photos" title="通用">
              <BackgroundPanel
                onChosen={(value) => {
                  onCloseChange &&
                    onCloseChange({
                      key: CoverTabEnum.photos,
                      coverUrl: value.url,
                    })
                }}
              />
            </Tab>
            <Tab key="upload" title="上传">
              <Upload
                startContent={<IoCloudUpload></IoCloudUpload>}
                onUploadImageSuccess={(coverUrl) => {
                  onCloseChange &&
                    onCloseChange({
                      key: CoverTabEnum.upload,
                      coverUrl,
                    })
                }}
              >
                图片上传
              </Upload>
            </Tab>
            <Tab key="link" title="链接">
              <Input
                onChange={onLinkInputChange}
                value={linkInput}
                endContent={
                  <Button
                    size="sm"
                    color="primary"
                    onPress={() => {
                      onCloseChange &&
                        onCloseChange({
                          key: CoverTabEnum.link,
                          coverUrl: linkInput,
                        })
                    }}
                  >
                    链接
                  </Button>
                }
              ></Input>
            </Tab>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
