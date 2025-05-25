import NextLink from 'next/link'

export const isHash = (href: string) => href?.indexOf('#') != -1
export const isProtocol = (href: string) =>
  href?.startsWith('mailto:') || href?.startsWith('tel:')
export const isExternal = (href: string) =>
  href?.startsWith('http') || href?.startsWith('whatsapp')

export function Link({
  href,
  children,
  ...rest
}: {
  href: string
  children: any
  [x: string]: any
}) {
  if (isExternal(href) || isProtocol(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    )
  }

  return (
    <NextLink href={href} {...rest}>
      {children}
    </NextLink>
  )
}
