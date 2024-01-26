import { FaGithub } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

const hyLinks = [
  {
    title: '资源',
    links: [
      {
        title: 'Next UI',
        href: 'https://nextui.org/',
      },
      {
        title: 'Tailwind CSS',
        href: 'https://tailwindcss.com/',
      },
    ],
  },
  {
    title: '联系方式',
    links: [
      {
        title: 'Github',
        href: 'https://github.com/charlesMYoung',
      },
    ],
  },
  {
    title: '其他',
    links: [
      {
        title: 'Dashboard',
        href: '/dashboard',
      },
    ],
  },
]

const linkIcons = [
  {
    title: 'Github',
    icon: <FaGithub />,
    href: 'https://github.com/charlesMYoung',
  },
]

 const Footer = () => {
  return (
    <footer className="bg-default-100">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a
              href="https://github.com/charlesMYoung"
              className="flex items-center"
            >
              <span className="self-center whitespace-nowrap text-2xl font-semibold text-default-800">
                CYatime
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            {hyLinks.map((hyLink) => {
              return (
                <div key={hyLink.title}>
                  <h2 className="mb-6 text-sm font-semibold uppercase text-default-800">
                    {hyLink.title}
                  </h2>
                  <ul className="font-medium text-default-500">
                    {hyLink.links.map((link, index) => {
                      return (
                        <li
                          className={twMerge(index === 0 && 'mb-4')}
                          key={link.title}
                        >
                          <a href={link.href} className="hover:underline">
                            {link.title}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            © 2024{' '}
            <a href="https://flowbite.com/" className="hover:underline">
              Charles™
            </a>
            . All Rights Reserved.
          </span>
          <div className="mt-4 flex sm:mt-0 sm:justify-center">
            {linkIcons.map((item) => {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  {item.icon}
                  <span className="sr-only">{item.title}</span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
