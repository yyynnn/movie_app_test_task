'use client'

import '../../styles/globals.css'

import Link from 'next/link'

import styles from './breaking.module.css'

export default function Page() {
  return (
    <div className={styles.component}>
      <div>BREAKING</div>
      <div>
        <Link href="/second">navigate to second</Link>
      </div>
    </div>
  )
}
