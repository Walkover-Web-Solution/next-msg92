import styles from "./trustedSection.module.scss"
export default function TrusedSection(trustedData) {
    
  return (
    <>
      <div className={`${styles.trusted} d-flex gap-2 gap-lg-4 flex-column`}>
        <p className={`${styles.heading} c-fs-3`}>Support 15+ channels & platforms</p>
        <div className={`${styles.imgs} d-flex flex-wrap gap-3 gap-lg-4`}>
          {trustedData?.trustedData?.trustedImgs.map((data, index) => (
            <img key={index} className={`${styles.img}`} src={`/img/pages/hello/platforms/${data}.svg`} alt={data} />
          ))}
          {trustedData?.trustedData?.moreText && (
            <span  className={`${styles.moretext}`}>{trustedData?.trustedData?.moreText}</span>
          )}
        </div>
      </div>
    </>
  );
}
