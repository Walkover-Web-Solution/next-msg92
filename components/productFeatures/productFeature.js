import styles from "./productFeature.module.scss";
import ProductFeatureCard from "./productFeatureCard";
export default function ProductFeatures() {
  const cardContents = ["hello", "hello", "hello"];

  return (
    <>
      <div className={`${styles.productFeatures} bg-lightgrey`}>
        <div className="container py-5 ">
          <div className={`${styles.cards} row gap-3 gap-md-5 p-2`}>
            {cardContents.map((content, index) => (
              <div
                key={index}
                className={`${styles.card} card ${
                  index % 3 === 2 ? "col-12 flex-row  flex-column flex-md-row col-sm-12" : " col-sm-12 col-lg flex-column flex-md-row flex-lg-column"
                } gap-3 p-2 p-md-3 p-lg-4 p-xl-5 d-flex align-items-center`}
              >
                <div className={`${
                  index % 3 === 2 ? "col-12 col-md-5 me-auto" : "col"} d-grid gap-2`}>
                    <img
                      className={`${styles.cardicon}`}
                      src="./img/pages/hello/unlimited-agents-ico.svg"
                    />
                    <h4 className={`${styles.cardheading} c-fs-3`}>
                      Unlimited Agents
                    </h4>

                  <p className={`${styles.cardcontent}  c-fs-4`}>
                    Unlimited free agents to power up your customer support.
                    More agents mean continuous engagement, more tickets
                    resolved and better customer support on offer. There is no
                    number attached to your number of customer support agents.
                  </p>
                </div>
                <img
                  className={`${styles.cardimg} `}
                  src="./img/pages/hello/unlimited-agents-img.svg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
