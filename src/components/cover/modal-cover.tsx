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
import { FaCloudUploadAlt, FaLink, FaUnsplash } from 'react-icons/fa'
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
            <Tab
              key="photos"
              title={
                <div className="flex items-center space-x-2">
                  <FaUnsplash />
                  <span>Unsplash</span>
                </div>
              }
            >
              <Input
                size="sm"
                className="w-full"
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
                    搜索
                  </Button>
                }
              ></Input>
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
            <Tab
              key="upload"
              title={
                <div className="flex items-center space-x-2">
                  <FaCloudUploadAlt />
                  <span>上传</span>
                </div>
              }
            >
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
              <div className="text-small text-default-300">
                图片需小于1500像素
              </div>
            </Tab>
            <Tab
              key="link"
              title={
                <div className="flex items-center space-x-2">
                  <FaLink />
                  <span>链接</span>
                </div>
              }
            >
              <Input
                size="sm"
                className="w-full"
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
