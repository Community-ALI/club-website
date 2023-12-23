export default function Home() {
  return (
    <>
      <h2
        className="text-lightBlue text-[45px] 
        text-center lg:text-[35px] md:text-[30px]"
      >
        Club Application
      </h2>
      <p
        className="text-darkBlue text-center font-[Nunito] font-[600]
      w-[540px] mr-auto ml-auto mt-[30px]"
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
      <div className="flex justify-center items-center mt-[80px]">
        <button
          className="text-offWhite text-[20px] px-[100px] py-[15px]
       bg-lightBlue hover:bg-darkBlue rounded-[80px] tracking-widest
       ease-in-out duration-200"
        >
          Start Application
        </button>
      </div>

      <h3 className="text-darkBlue w-[100%] text-[18px] text-center tracking-wide 
      absolute bottom-5 left-1/2 transform -translate-x-1/2">
        Important: Submit Club Application Before January 25th Deadline!
      </h3>
    </>
  );
}
