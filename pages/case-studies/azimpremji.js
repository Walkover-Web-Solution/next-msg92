
import Footer from "@/components/footer";

const azim_Premji = () => {
  return (
    <>
      <div className="container d-flex overflow-hidden bg-white py-5 flex-column flex-md-row mb-5 align-items-center">
        <div className="row col-12 col-md-5 d-flex">
          <div className="container border border-5 border-dark rounded-1 px-4 py-2">
            <div className="mb-3">
              <img src="../img/azim-premji.png"></img>
            </div>
            <span className="c-fs-3 c-fw-b c-col-grey">Industry</span>
            <div className="mb-4">
              <span className="c-fs-3 c-fw-b mb-1 c-col-grey">NGO (Education)</span>
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
              <h5 className="sub-heading py-5">Azim Premji Foundation informs teachers and trainers using SMS via MSG91</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h1 className="c-fw-b mb-4">Case Studies - Azim Premji</h1>
        <span className="c-fs-3"><a target="_blank" href="https://azimpremjifoundation.org/">Azim Premji Foundation</a> is an NGO which works in the fields of Education. With the vision to help people with proper education by conducting classes and creating awareness, Azim Premji Foundation has been rigorously working on coordinating with the teachers for social welfare.</span>
      </div>

      <div className="container py-5">
        <h2 className="c-fw-b mb-4">Problem</h2>
        <span className="c-fs-3">A well-established communication channel with teachers is a key requirement to ensure better operations. Setting up seamless operations while maintaining a huge volunteer teachers’ base without a robust and secure communication channel is a challenge. Thus to convey important information like details of vacancies, events and courses for better educational network, a communication channel targeting wide reach for mass audience (teachers) is required.</span>
      </div>

      <div className="container py-5">
        <h2 className="c-fw-b mb-4">Solution</h2>
        <span className="c-fs-3">Azim Premji Foundation is managing their operations and communication efficiently with SMS communications via MSG91 API. With MSG91’s Transactional and Unicode APIs and real-time robust system, SMS is delivered to the teachers to build communication at different events such as</span>
        <ul>
          <li className="c-fs-3 mt-3">Potential teachers and teacher’s educators are <a href="#">informed about the job vacancies</a> via SMS.</li>
          <li className="c-fs-3 mt-1">Teacher’s are sent <a href="#">informed about the job vacancies</a> via SMS.</li>
          <li className="c-fs-3 mt-1">SMS regarding <a href="#">informed about the job vacancies</a> are sent to teachers.</li>
        </ul>
        <span className="c-fs-3">This way Azim Premji Foundation has been able to establish and maintain an effective coordination with teachers via SMS using MSG91 API.</span>
      </div>

      <div className="container py-5">
        <h2 className="c-fw-b mb-4">Benefit</h2>
        <span className="c-fs-3">As a result, the teachers gets details of vacancies via secured channel, making the operations reliable and seamless. Moreover, the updates of events and courses sent to teachers results in a better coordination and resulting a better network of teachers for better education.</span>
      </div>
      <div className="container py-5">
<a href="/case-studies">Back</a>
</div>
</>
  );
};

export default azim_Premji;
