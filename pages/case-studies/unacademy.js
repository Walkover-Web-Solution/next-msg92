
import Footer from "@/components/footer";

const azim_Premji = () => {
  return (
    <>

      <div className="container d-flex overflow-hidden bg-white py-5 flex-column flex-md-row mb-5 align-items-center">
        <div className="row col-12 col-md-5 d-flex">
          <div className="container border border-5 border-dark rounded-1 px-4 py-2">
            <div className="mb-3">
              <img src="../img/unacademy1.png"></img>
            </div>
            <span className="c-fs-3 c-fw-b c-col-grey">Industry</span>
            <div className="mb-4">
              <span className="c-fs-3 c-fw-b mb-1 c-col-grey"> Education </span>
            </div>
            <div className="mb-1">
              <span className="c-fs-3 c-fw-b mb-1 c-col-grey">Purpose</span>
            </div>
            <div className="mb-4">
              <span className="c-fs-4 mb-1 col-otp">Communication APIs</span>
            </div>
            <div className="mb-1">
              <span className="c-fs-3 c-fw-b mb-1 c-col-grey">Features in use</span>
            </div>
            <div className="mb-4">
              <span className="c-fs-4 mb-1 col-otp">Programmable SMS</span>
            </div>
          </div>
        </div>
        <div className="row col-md-8 col-sm-12 d-flex px-5 ms-3">
          <div className="container p-5">
            <div className="py-5">
              <h5 className="sub-heading py-5">Unacademy is an online platform that makes both learning and teaching easy with its educational videos and lectures</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Case Studies - Unacademy</h1>
        <span className="c-fs-3">Unacademy is an e-learning platform that aims to build an online knowledge repository for multilingual education. The Bengaluru based edtech platform founded by Gaurav Munjal, Roman Saini and Hemesh Singh connects expert educators with students across cities looking for quality education.
</span>
      </div>

      <div className="container py-5">
        <h2 className="c-fw-b mb-4">Problem</h2>
        <span className="c-fs-3">A well-established communication channel with teachers is a key requirement to ensure better operations. Setting up seamless operations while maintaining a huge volunteer teachers’ base without a robust and secure communication channel is a challenge. Thus to convey important information like details of vacancies, events and courses for better educational network, a communication channel targeting wide reach for mass audience (teachers) is required.</span>
      </div>

      <div className="container py-5">
        <h2 className="c-fw-b mb-4">Solution</h2>
        <span className="c-fs-3">With a great team combination and an enthusiastic spirit, the two folks embarked on the big journey in the ed-tech space. The question now is what is so different about them and their product that it has picked up popularity amongst students, SMS is delivered to the students to build communication at different events such as</span>
        <ul>
          <li className="c-fs-3 mt-3"><strong> Accio tutors - </strong> Unacademy started as a pure marketplace. They attracted teachers with a value proposition based on earnings, work from home, and independence via SMS.</li>
          <li className="c-fs-3 mt-1"><strong> Low cost but premium content - </strong> What makes Unacademy different is the Unacademy educator’s app. This makes it easier for the tutor/mentor to record lectures on the phone at ease. Keeping the cost of content low, they have been able to expand their reach because of the affordability via SMS.</li>
          <li className="c-fs-3 mt-1"><strong> Combination courses - </strong> Unacademy has set the right benchmarks when it comes to courses and its expanse. Let us say if you are preparing for the management exam – CAT, will parallelly prepare you for all other management colleges who conduct their exams or tests based on similar lines as CAT via SMS.</li>
        </ul>
        <span className="c-fs-3">This way Unacademy has been able to establish and maintain an effective coordination with students via SMS using MSG91 API.</span>
      </div>

      <div className="container py-5">
        <h2 className="c-fw-b mb-4">Benefit</h2>
        <span className="c-fs-3">As a result, the teachers gets details of vacancies via secured channel, making the operations reliable and seamless. Moreover, the updates of events and courses sent to students and teachers results in a better coordination and resulting a better network of teachers for better education.</span>
      </div>
    <div className="container py-5">
<a href="/case-studies">Back</a>
</div>
</>
  );
};

export default azim_Premji;
