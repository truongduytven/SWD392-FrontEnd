import { cn } from '@/lib/utils'
import React from 'react'

type Props = { children: React.ReactNode; className?: string }

function Container({ children, className }: Props) {
  return <div className={cn('w-full mx-auto max-w-7xl', className)}>{children}</div>
}

export default Container