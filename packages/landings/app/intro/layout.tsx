import { NextSeo } from 'next-seo'

import { NEXT_SEO_DEFAULT } from './intro.config' // your path will vary
import styles from './layout.module.css'

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>HEQS Intro page</title>
        <NextSeo {...NEXT_SEO_DEFAULT} useAppDir={true} />
      </head>
      <body>
        <div className={styles.children}>{children}</div>
      </body>
    </html>
  )
}
