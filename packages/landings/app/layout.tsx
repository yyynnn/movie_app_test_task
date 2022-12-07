import styles from './layout.module.css'

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>HEQS</title>
      </head>
      <body>
        <div className={styles.children}>{children}</div>
      </body>
    </html>
  )
}
