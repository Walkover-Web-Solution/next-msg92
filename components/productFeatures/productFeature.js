import styles from "./productFeature.module.scss";
export default function ProductFeatures(featureData) {
  const features = featureData.featureData

  return (
    <>
      <div className={`${styles.productFeatures} bg-lightgrey`}>
        <div className="container py-5 ">
          <div className={`${styles.cards} row gap-3 gapmd-5 gap-md-5 p-2`}>
            {features.map((content, index) => (
              <div
                key={index}
                className={`${styles.card} card ${
                  index % 3 === 2 ? " col-12 flex-row  flex-column flex-md-row col-sm-12" : " col-sm-12 col-lg flex-column flex-md-row flex-lg-column"
                } gap-2 gap-sm-5 p-4  p-xl-5 d-flex align-items-center rounded-2`}
              >
                <div className={`${
                  index % 3 === 2 ? "col-12 col-md-5 me-auto" : "col"} d-grid gap-2`}>
                    <img
                      className={`${styles.cardicon}`}
                      src={content?.slug ? `/img/pages/hello/${content?.slug}-ico.svg` : `/img/pages/hello/${content?.name.toLowerCase().replace(/\/| /g, '-')}-ico.svg`}
                      alt={`${content?.name}-ico`} 
                    />
                    <h4 className={`${styles.cardheading} c-fs-2`}>
                     {content?.name}
                    </h4>

                  <p className={`${styles.cardcontent}  c-fs-4`}>
                   {content?.des}
                  </p>
                </div>
                <img
                  className={`${styles.cardimg} `}
                  src={content?.slug ? `/img/pages/hello/${content?.slug}-img.svg` : `/img/pages/hello/${content?.name.toLowerCase().replace(/\/| /g, '-')}-img.svg`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
