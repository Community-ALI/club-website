import ClubApplicationHeaderSection from "./ClubApplicationHeaderSection";

export default function SubmitApplication(props) {
  const { club } = props;
  // turn the club into a form
  const clubInformation = club.clubInformation;
  let clubAdvisors = club.clubAdvisors;
  // only get the name, email, and phone number
  clubAdvisors = clubAdvisors.map((advisor) => {
    return {
      name: advisor.name,
      email: advisor.email,
      phoneNumber: advisor.phoneNumber,
    };
  });
  let clubOfficers = club.clubOfficers;
  // only get the role, name, email, wNumber, phoneNumber, major, and gradeLevel
  clubOfficers = clubOfficers.map((officer) => {
    return {
      role: officer.role,
      name: officer.name,
      email: officer.email,
      wNumber: officer.wNumber,
      phoneNumber: officer.phoneNumber,
      major: officer.major,
      gradeLevel: officer.gradeLevel,
    };
  });
  let clubMembers = club.clubMembers;
  // only get the name, email, and wNumber
  clubMembers = clubMembers.map((member) => {
    return {
      name: member.name,
      email: member.email,
      wNumber: member.wNumber,
    };
  });
  
  const clubAgreement = club.clubAgreement;
  let form = {
    clubInformation: clubInformation,
    clubAdvisors: clubAdvisors,
    clubOfficers: clubOfficers,
    clubMembers: clubMembers,  
    clubAgreement: clubAgreement,
  }

  return (
    <div className="px-12 py-12 md:px-[30px] xsm:px-[20px]">
      <ClubApplicationHeaderSection title="SUBMIT APPLICATION" />
      <p className="font-[Nunito] text-[15px] sm:text-[14px] xxsm:text-[13px] mt-[20px] mb-[30px] px-3">
        Before you submit your application, please take a moment to carefully
        review all the information you have provided. Make sure that every
        detail is accurate and complete, as you will not be able to make any
        edits once the application is submitted. Checking for typos and
        incorrect data can help prevent any delays or issues with the processing
        of your application.{" "}
      </p>
      <hr />
      <div className="flex justify-between my-8 gap-x-8 sm:flex-col gap-y-4">
        <h2>FOR SPRING SEMESTER 2024</h2>
        <a className="text-lightBlue font-[Nunito] text-[14px] underline underline-offset-4" 
        href="https://youtu.be/dQw4w9WgXcQ" target="_blank">
          Click here to receive a copy
        </a>
      </div>
      {/* the form section */}
      <ReviewSection key={1} title={"Club Information"} subtitle = "" form={form.clubInformation} />
      <ReviewSection key={2} title={"Club Advisors"} subtitle = "Advisor" form={form.clubAdvisors} />
      <ReviewSection key={3} title={"Club Officers"} subtitle = "Officer" form={form.clubOfficers} />
      <ReviewSection key={4} title={"Club Members"} subtitle = "Member" form={form.clubMembers} />
      <AgreementSection key={5} title={"Club Agreement"} form={form.clubAgreement} /> 
      {/* sorry about messing up the reusability. On a time crunch. */}
    </div>
  );
}

function ReviewSection(props) {
  const { title, subtitle, form } = props;
  // check if form is an array
  if (Array.isArray(form)) {
    console.log('array detected');
    return (
      <div className="border-solid border-[2px] px-12 py-12 md:px-[30px] xsm:px-[20px] border-lightGray">
        <h1 className="mb-12 text-[20px]">{formatCamelCase(title).toUpperCase()}</h1>
        {form.map((item, index) => (
          <div key={index} className="flex flex-col border-solid border-lightGray py-2">
            <h3 className="text-[#4D4D4D]">{subtitle.toUpperCase()} #{index + 1}</h3>        
            {/* map through each item in the array */}
            {Object.entries(item).map(([key, value]) => (
              <div key={key} className="flex border-b-2 border-solid border-lightGray py-2">        
              <p className="flex-1">{formatCamelCase(key)}</p>
              <p className="flex-1">{formatCamelCase(value)}</p>
            </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
  function formatCamelCase(input) {
    try{
      const spacedSentence = input.replace(/([a-z])([A-Z])/g, '$1 $2');
      return spacedSentence.charAt(0).toUpperCase() + spacedSentence.slice(1);
    }
    catch{
      return input;
    }
  }

  return (
    <div className="border-solid border-[2px] px-12 py-12 md:px-[30px] xsm:px-[20px] border-lightGray">
      <h1 className="mb-12 text-[20px]">{formatCamelCase(title).toUpperCase()}</h1>
      {Object.entries(form).map(([key, value]) => (
        <div key={key} className="flex border-b-2 border-solid border-lightGray py-2">        
          <p className="flex-1">{formatCamelCase(key)}</p>
          <p className="flex-1">{formatCamelCase(value)}</p>
        </div>
      ))}
    </div>
  );
}

function AgreementSection(props) {
  const { title, form } = props;
  console.log(form)
  // FIXME: use proper formatting rather than 5 spaces
  const newForm = {
    clubPresidentSignature: form[0].signature + "     " + form[0].date,
    clubAdvisorSignature: form[1].signature + "     " + form[1].date,
  }
  function formatCamelCase(input) {
    try{
      const spacedSentence = input.replace(/([a-z])([A-Z])/g, '$1 $2');
      return spacedSentence.charAt(0).toUpperCase() + spacedSentence.slice(1);
    }
    catch{
      console.error("Error formatting camel case");
      return input;
    }
  }

  return ( 
    <div className="border-solid border-[2px] px-12 py-12 md:px-[30px] xsm:px-[20px] border-lightGray">
      <h1 className="mb-12 text-[20px]">{formatCamelCase(title).toUpperCase()}</h1>
      {Object.entries(newForm).map(([key, value]) => (
        <div key={key} className="flex border-b-2 border-solid border-lightGray py-2">        
          <p className="flex-1">{formatCamelCase(key)}</p>
          <p className="flex-1">{formatCamelCase(value)}</p>
        </div>
      ))}
    </div>
  );
}
