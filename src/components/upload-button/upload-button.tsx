'use client'

import RcUpload, { type UploadProps } from 'rc-upload'

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
    async customRequest({ data, file, filename, headers, onError, onSuccess }) {
      const formData = new FormData()
      if (data) {
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key] as string)
        })
      }
      if (filename) formData.append(filename, file)
      try {
        const res = await fetch(`/sample&type=cover`, {
          method: 'POST',
          body: formData,
          headers: headers,
        }).then((resp) => resp.json())

        onSuccess && onSuccess(res)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        onError && onError(err, null)
      }

      return {
        abort() {
          console.log('upload progress is aborted.')
        },
      }
    },
  }

  return (
    <RcUpload {...uploadProps}>
      {props.startContent}
      {props.children}
    </RcUpload>
  )
}

Upload.displayName = 'Upload'
