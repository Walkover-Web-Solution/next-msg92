export default function FaqSection(faqData) {
  const faqs = faqData?.faqData;
  
  return (
    <>
      <div className="container my-5 d-grid gap-4">
        <h2 className="c-fs-1">Frequently Asked Questions</h2>
        <div class="accordion" id="accordionExample">
          {faqs.map((data, index) => {
            {
            }
            return (
              <div class="accordion-item border-bottom border-start-0 border-end-0">
                <h2 class="accordion-header active" id={`heading${index}`}>
                  <button
                    class="accordion-button  color-blue fs-5 c-fw-m"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                    aria-expanded="false"
                    aria-controls={`collapse${index}`}
                  >
                    {data?.que}
                  </button>
                </h2>
                <div
                  id={`collapse${index}`}
                  class={`accordion-collapse border border-start border-end collapse ${
                    index == 0 ? "show" : ""
                  }`}
                  aria-labelledby={`heading${index}`}
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body c-fs-4">{data?.des}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
