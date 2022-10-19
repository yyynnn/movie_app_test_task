import React, { PropsWithChildren } from 'react'

export type RFCC<T = Record<string, unknown>> = React.FC<PropsWithChildren<T>>
