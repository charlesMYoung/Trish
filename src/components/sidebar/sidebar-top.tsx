import { twMerge } from 'tailwind-merge'

export function SidebarTop() {
  return (
    <div
      className={twMerge(
        'z-40 flex h-auto w-full items-center justify-center',
        'mb-10 h-20'
      )}
    >
      LOGO
    </div>
  )
}
