import TrustedBy from '@/components/trustedby'
import styles from'./certificate.module.scss'
export default function () {
  return <>
  <div className={`${styles.class} text-white`}>
    hiid
    <TrustedBy/>
  </div>
  </>
}
