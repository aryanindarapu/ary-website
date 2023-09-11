import styles from './page.module.css'
import { TabSliders, HamburgerMenu } from '@/app/tabs'

export const metadata = {
  title: 'Ary Indarapu',
  description: 'Personal website for Aryan Indarapu.',
}

export default function Home() {
  return (
    <main className={styles.main}>
      <HamburgerMenu />
      <div className={styles.description}>
        <TabSliders />
      </div>
    </main>
  )
}
