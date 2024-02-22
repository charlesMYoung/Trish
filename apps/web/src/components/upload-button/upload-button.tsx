'use client'

import RcUpload, { type UploadProps } from 'rc-upload'
import { type UploadRequestError } from 'rc-upload/lib/interface'

export type UploadButtonProps = {
  startContent?: React.ReactNode
  children?: React.ReactNode
  onUploadImageSuccess?: (image: string) => void
}

export const Upload = (props: UploadButtonProps) => {
  const uploadProps: UploadProps = {
    multiple: false,
    onStart(file) {
      console.log('onStart', file, file.name)
    },
    onSuccess(res) {
      const { image } = res as { image: string }
      if (image) {
        props.onUploadImageSuccess && props.onUploadImageSuccess(image)
      }
    },
    onError(err) {
      console.log('onError', err)
    },
    customRequest({ data, file, filename, headers, onError, onSuccess }) {
      const formData = new FormData()
      if (data) {
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key] as string)
        })
      }
      if (filename) formData.append(filename, file)
      fetch(`r`, {
        method: 'POST',
        body: formData,
        headers: headers,
      })
        .then((resp) => resp.json())
        .then((data) => {
          onSuccess && onSuccess(data)
        })
        .catch((err: UploadRequestError) => {
          onError && onError(err, null)
        })

      return {
        abort() {
          console.log('upload progress is aborted.')
        },
      }
    },
  }

  return (
    <RcUpload {...uploadProps} className="flex items-center space-x-2">
      {props.startContent}
      <span>{props.children}</span>
    </RcUpload>
  )
}

Upload.displayName = 'Upload'
