import * as React from 'react'

declare global {
  interface ITabProps {
    id: string
    ariaLabelledBy: string
    active: string
  }
}

export function Tab({
  id,
  ariaLabelledBy,
  active,
  children
}: React.PropsWithChildren<ITabProps>) {
  return (
    <div
      tabIndex={0}
      role="tabpanel"
      id={id}
      aria-labelledby={ariaLabelledBy}
      style={{
        display: active === id ? 'block' : 'none'
      }}
    >
      {children}
    </div>
  )
}
