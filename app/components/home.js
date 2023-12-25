import MainButton from "./main-button";
import SectionTitle from "./section-title";

export default function Home() {
  return (
    <div className="animate-componentFade">
      <SectionTitle text="Club Application"></SectionTitle>
      <p
        className="text-darkBlue text-center font-[Nunito] font-[600] w-[540px] 
        lg:w-[500px] md:w-[380px] mr-auto ml-auto mt-[30px] md:text-[14px] 
        sm:text-[13px] xsm:text-[12px] xsm:w-[330px] xxsm:w-[300px]"
      >
        Facilitating club success is the highest priority for Campus Life &
        Student Learning. With many clubs taking part in hundreds of activities
        each year, it is important that each club understands and knows what is
        required to hold meetings, use funds, and host events that are all
        within the rules of the district and the college. Campus Life serves as
        the process center to many policies and procedures that are a part of
        YCCD, MJC Business Services, MJC Facilities, and MJC Media Services. All
        of these departments play a key role in booking a room and hosting a
        campus event.
      </p>
      <div className="flex justify-center items-center mt-[80px] lg:mt-[60px] xsm:mt-[40px]">
        <MainButton text="Start Application"></MainButton>
      </div>
    </div>
  );
}
