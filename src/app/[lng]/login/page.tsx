import { useTranslation } from '~/app/i18n'
import { Logo } from '~/components/logo/logo'
import { cn } from '~/utils/cn'
import { DarkSwitch } from './dark-switch'
import { LoginForm } from './login-form'
import { SideLoginImage } from './side-image'

export default async function Login({
  params: { lng },
}: {
  params: { lng: string }
}) {
  const { t } = await useTranslation(lng, 'login')
  return (
    <div className={cn('h-full', 'flex')}>
      <div className="flex-col justify-between flex-1 hidden md:flex">
        <div className={cn('w-full h-screen relative')}>
          <SideLoginImage />
          <div className="text-2xl text-default-500 absolute z-20">
            <div className="h-screen px-5 flex flex-col justify-between space-x-4 py-4">
              <Logo />
              <div>
                <div className="text-4xl text-foreground">{t('title')}</div>
                <div className="text-4xl text-primary-500">Trish</div>
              </div>
              <div className="top-0 text-default-600 text-sm">
                © {new Date().getFullYear()}{' '}
                <span className="text-secondary-500">
                  {t('version')} - {process.env.npm_package_version}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="h-screen px-5 flex flex-col justify-between py-4">
          <div className="w-full flex justify-end">
            <DarkSwitch />
          </div>
          <div className="flex justify-center">
            <LoginForm lng={lng} />
          </div>
          <div />
        </div>
      </div>
    </div>
  )
}
