export default function FaqSection(faqData) {
    const faqs = faqData?.faqData
    
    return (
      <>
        <div className="container my-5 d-grid gap-4">
          <h2 className="c-fs-1">Frequently Asked Questions</h2>
          <div class="accordion" id="accordionExample">
            {faqs.map((data, index) => {
            
              return (
                <div class="accordion-item">
                  <h2 class="accordion-header" id={`heading${index}`}>
                    <button
                      class="accordion-button c-fs-3"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded="true"
                      aria-controls={`collapse${index}`}
                    >
                      {data?.que}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    class={`accordion-collapse collapse ${
                      index == 0 ? "show" : ""
                    }`}
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body c-fs-4">{data?.ans}</div>
                  </div>
                </div>
              );
            })}
           
          </div>
        </div>
      </>
    );
  }