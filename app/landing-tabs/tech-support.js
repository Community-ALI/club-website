import SectionTitle from "../components/section-title";
import MainButton from "../components/main-button";

const InputField = ({ title, type, placeholder, onChange, value, name }) => (
  <div className="w-full">
    <p className="font-[Nunito] font-[700] text-[18px] md:text-[16px] xsm:text-[15px] xxsm:text-[14px] text-darkBlue tracking-wide">
      {title}
    </p>
    <input
      className="custom-input mt-[10px] sm:mt-[5px] w-[100%] border-b-[2px] border-[#8D8D8D] 
  focus:outline-none focus:border-b-darkBlue duration-200 ease text-darkBlue text-[18px] md:text-[16px] xsm:text-[14px] xxsm:text-[13px]"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
    ></input>
  </div>
);

export default function TechSupport() {
  const [formInfo, setFormInfo] = useState({
    fullName: "",
    clubRelation: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const email = {
      email: "", //Idk who to send this email too
      subject: ``,
      message
    }

    const response = await fetch('https://api.example.com/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formInfo),
    });
  
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      // handle the response
    } else {
      console.error('HTTP-Error: ' + response.status);
    }
  };

  function mapField(input, index) {
    return (
      <InputField
        key={index}
        title={input.title}
        type={input.type}
        placeholder={input.placeholder}
        value={formInfo[input.name]}
        onChange={(e) =>
          setFormInfo({ ...formInfo, [input.name]: e.target.value })
        }
        name={input.name}
      ></InputField>
    );
  }
  return (
    <>
      <div className="animate-componentFade">
        <SectionTitle text="Tech Support"></SectionTitle>
        <form className="flex flex-col justify-center items-center w-[650px] md:w-[80%] xsm:w-[85%] mr-auto ml-auto mt-[10px]">
          <div className="w-[100%] flex justify-center gap-[50px] sm:flex-col sm:gap-[30px]">
            {[
              {
                title: "Full Name",
                type: "text",
                placeholder: "Petey the Pirate",
                name: "fullName",
              },
              {
                title: "Club Relation (optional)",
                type: "text",
                placeholder: "Ex: The MJC Pirates Club",
                name: "clubRelation",
              },
            ].map(mapField)}
          </div>
          <div className="w-[100%] flex justify-center gap-[50px] mt-[30px] sm:flex-col sm:gap-[30px]">
            {[
              {
                title: "School Email",
                type: "email",
                placeholder: "something@(my)yosemite.edu",
                name: "email",
              },
              {
                title: "Phone Number (optional)",
                type: "phone",
                placeholder: "(XXX)-XXX-XXXX",
                name: "phoneNumber",
              },
            ].map(mapField)}
          </div>
          {[
            {
              title: "Message",
              type: "text",
              placeholder: "Ex: I need help with...",
              name: "message",
            },
          ].map(mapField)}
        </form>
        <div className="flex justify-center items-center mt-[60px]">
          <MainButton text="Send Message"></MainButton>
        </div>
      </div>
    </>
  );
}
