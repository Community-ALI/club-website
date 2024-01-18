export default function RegistrationFilled(props) {
  const { form } = props;
  return (
    <>
      {/* the form section */}
      <ReviewSection
        key={1}
        title={"Club Information"}
        subtitle=""
        form={form.clubInformation}
      />
      <ReviewSection
        key={2}
        title={"Club Advisors"}
        subtitle="Advisor"
        form={form.clubAdvisors}
      />
      <ReviewSection
        key={3}
        title={"Club Officers"}
        subtitle="Officer"
        form={form.clubOfficers}
      />
      <ReviewSection
        key={4}
        title={"Club Members"}
        subtitle="Member"
        form={form.clubMembers}
      />
      <AgreementSection
        key={5}
        title={"Club Agreement"}
        form={form.clubAgreement}
      />
    </>
  );
}



function ReviewSection(props) {
    const { title, subtitle, form } = props;
  
    function formatCamelCase(input) {
      try {
        const spacedSentence = input.replace(/([a-z])([A-Z])/g, '$1 $2');
        return spacedSentence.charAt(0) + spacedSentence.slice(1);
      } catch {
        return input;
      }
    }
  
    function renderValue(value) {
      return value ? value : <span className="text-[#ff0000]">{value || 'Missing'}</span>;
    }
  
    if (Array.isArray(form)) {
      return (
        <div className="border-solid border-[2px] px-10 py-10 sm:py-6 md:px-[30px] xsm:px-[20px] xxsm:px-[15px] border-lightGray font-[Nunito]">
          <h1 className="text-[20px] sm:text-[18px] xsm:text-[16px] xxsm:text-[14px] text-[#4D4D4D]">{formatCamelCase(title).toUpperCase()}</h1>
          {form.map((item, index) => (
            <div key={index} className="flex flex-col border-solid border-lightGray py-2">
              <h3 className="text-[#4D4D4D] mt-6 xsm:mt-4 sm:text-[14px] xsm:text-[13px] xxsm:text-[12px]">{subtitle.toUpperCase()} #{index + 1}</h3>
              {item.placeholder ? (
                <p className="border-b-[1px] border-solid border-lightGray pt-3 pb-1 md:text-[14px] sm:text-[13px] xsm:text-[12px]">{item.placeholder}</p>
              ) : (
                Object.entries(item).map(([key, value]) => (
                  <div key={key} className="flex border-b-[1px] border-solid border-lightGray pt-3 pb-1">
                    <p className="flex-1 md:text-[14px] sm:text-[13px] xsm:text-[12px]">{formatCamelCase(key)}</p>
                    <p className="flex-1 font-[600] md:text-[14px] sm:text-[13px] xsm:text-[12px]">{renderValue(value)}</p>
                  </div>
                ))
              )}
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
    
    const meetingLocation = form.meetingLocation;
  
    return (
      <div className="border-solid border-[2px] px-10 py-10 sm:py-6 md:px-[30px] xsm:px-[20px] xxsm:px-[15px] border-lightGray font-[Nunito]">
        <h1 className="text-[20px] sm:text-[18px] xsm:text-[16px] xxsm:text-[14px] text-[#4D4D4D] mb-3 sm:mb-2">{formatCamelCase(title).toUpperCase()}</h1>
        {Object.entries(form).map(([key, value]) => {
          // Skip rendering the meetingLocation field
          if (key === "meetingLocation") {
            return null;
          }
          if (key === "zoomLink" && (meetingLocation === "In Person")) {
            value = value || "This club does not have online meetings";
          } else if (key === "buildingAndRoomNumber" && (meetingLocation === "Online/Zoom")) {
            value = value || "This club does not have in-person meetings";
          }
          return (
            <div key={key} className="flex border-b-[1px] border-solid border-lightGray pt-3 pb-1">        
              <p className="flex-1 md:text-[14px] sm:text-[13px] xsm:text-[12px]">{formatCamelCase(key)}</p>
              <p className="flex-1 font-[600] md:text-[14px] sm:text-[13px] xsm:text-[12px]">{renderValue(value)}</p>
            </div>
          );
        })}
      </div>
    );
  }
  
  function AgreementSection(props) {
    const { title, form } = props;
    console.log(form)
    // FIXME: use proper formatting rather than 5 spaces
    const newForm = {
      clubPresidentSignature: form[0].signature,
      clubAdvisorSignature: form[1].signature,
      // clubAdvisorSignature: form[1].signature + "     " + form[1].date,
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
  
    function renderValue(value) {
      return value ? value : <span className="text-[#ff0000]">{value || 'Missing'}</span>;
    }
  
    return ( 
      <div className="border-solid border-[2px] px-10 py-10 sm:py-6 md:px-[30px] xsm:px-[20px] xxsm:px-[15px] border-lightGray font-[Nunito]">
        <h1 className="text-[20px] sm:text-[18px] xsm:text-[16px] xxsm:text-[14px] text-[#4D4D4D] mb-3 sm:mb-2">{formatCamelCase(title).toUpperCase()}</h1>
        {Object.entries(newForm).map(([key, value]) => (
          <div key={key} className="flex border-b-[1px] border-solid border-lightGray pt-3 pb-1">        
            <p className="flex-1 md:text-[14px] sm:text-[13px] xsm:text-[12px]">{formatCamelCase(key)}</p>
            <p className="flex-1 font-[600] md:text-[14px] sm:text-[13px] xsm:text-[12px]">{renderValue(value)}</p>
          </div>
        ))}
      </div>
    );
  }