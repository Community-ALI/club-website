import SectionTitle from "../reusable-components/section-title";
import MainButton from "../reusable-components/main-button";

const InputField = ( {title, type, placeholder} ) => (
  <div className="w-full">
  <p className="font-[Nunito] font-[700] text-[18px] md:text-[16px] xsm:text-[15px] xxsm:text-[14px] text-darkBlue tracking-wide">{title}</p>
  <input className="custom-input mt-[10px] sm:mt-[5px] w-[100%] border-b-[2px] border-[#8D8D8D] 
  focus:outline-none focus:border-b-darkBlue duration-200 ease text-darkBlue text-[18px] md:text-[16px] xsm:text-[14px] xxsm:text-[13px]" 
  type={type} placeholder={placeholder}></input>
</div>
);

export default function TechSupport() {
  return (
    <>
      <div className="animate-componentFade">
        <SectionTitle text="Tech Support"></SectionTitle>
        <form className="flex flex-col justify-center items-center w-[650px] md:w-[80%] xsm:w-[85%] mr-auto ml-auto mt-[10px]">
          <div className="w-[100%] flex justify-center gap-[50px] sm:flex-col sm:gap-[30px]">
            <InputField
            title="Full Name"
            type="text"
            placeholder="Petey the Pirate">
            </InputField>
            <InputField
            title="Club Relation (optional)"
            type="text"
            placeholder="Ex: The MJC Pirates Club">
            </InputField>
          </div>
          <div className="w-[100%] flex justify-center gap-[50px] mt-[30px] sm:flex-col sm:gap-[30px]">
          <InputField
            title="School Email"
            type="email"
            placeholder="something@(my)yosemite.edu">
            </InputField>
            <InputField
            title="Phone Number (optional)"
            type="phone"
            placeholder="(XXX)-XXX-XXXX">
            </InputField>
          </div>
          <div className="w-[100%] mt-[30px]">
          <InputField
            title="Message"
            type="text"
            placeholder="What problem are you experiencing?">
            </InputField>
          </div>
        </form>
        <div className="flex justify-center items-center mt-[60px]">
          <MainButton text="Send Message"></MainButton>
        </div>
      </div>
    </>
  );
}
