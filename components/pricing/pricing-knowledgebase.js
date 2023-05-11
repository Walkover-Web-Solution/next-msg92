import { MdDoneOutline, MdClose } from "react-icons/md";
const pricingknowledgebase = () => {
return (
  <>
    <div class="d-flex flex-wrap flex-gap gap-3 justify-content-center w-100  card-container align-items-end">      
      <div class="mx-3">
        <div class="card kb price-card email border-0 text-center mb-4 mb-sm-0 c-bg-grey">
          <div class="card-body">
            <h3 class="c-fs-3">Free</h3>
            <h5 class="mt-2 c-fs-2">$0/Month</h5>            
            <div class="c-fs-5 mt-2">
                This plan is free of cost and offers limited but <a href="/knowledgebase" target="_blank">all necessary features</a> to make your customer KnowledgeBase live. 
            </div>
            <a
              href="https://control.msg91.com/signup/"
              target="_blank"
              class="c-fs-5 btn btn-sm w-100 btn-outline-dark mt-2"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
      <div class="mx-3">
        <div class="text-center d-flex flex-column mb-4 mb-sm-0 align-items-center ">          
          <div class="card-popular price-card email card kb text-center mb-4 mb-sm-0 c-bg-grey">
            <div class="card-body">
              <h3 class="c-fs-3">Alpha</h3>
              <h5 class="mt-2 c-fs-2">$50/Month</h5>
              <div class="c-fs-3">+</div>
              <div class="c-fs-4">0.00275 USD per read count</div>
              
              <div class="c-fs-5 mt-2" >
                Unlock all premium/nice to have/ luxury features, Explore all features <a href="/knowledgebase" target="_blank">here</a>
                </div>
              <a
                href="https://control.msg91.com/signup/"
                target="_blank"
                class="c-fs-5 btn btn-sm w-100 btn-dark mt-2"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>      
    </div>
  </>
);
};

export default pricingknowledgebase;
