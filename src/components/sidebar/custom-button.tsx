import {
  ButtonProps as BaseButtonProps,
  Ripple,
  Spinner,
  useButton,
} from '@nextui-org/react'
import { forwardRef } from 'react'

export interface ButtonProps extends BaseButtonProps {}

export const NotButtonEl = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      domRef,
      children,
      spinnerSize,
      spinner = <Spinner color="current" size={spinnerSize} />,
      spinnerPlacement,
      startContent,
      endContent,
      isLoading,
      disableRipple,
      getButtonProps,
      getRippleProps,
    } = useButton({
      ref,
      ...props,
    })

    const { ripples } = getRippleProps()

    return (
      <a ref={domRef} {...getButtonProps()} className={props.className}>
        {startContent}
        {isLoading && spinnerPlacement === 'start' && spinner}
        {children}
        {isLoading && spinnerPlacement === 'end' && spinner}
        {endContent}
        {!disableRipple && (
          <Ripple
            ripples={ripples}
            onClear={function (): void {
              throw new Error('Function not implemented.')
            }}
          />
        )}
      </a>
    )
  }
)

NotButtonEl.displayName = 'NotButtonEl'
