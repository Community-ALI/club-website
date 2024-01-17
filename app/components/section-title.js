export default function SectionTitle ({ text }) {
  return (
    <>
      <h2
        className="text-lightBlue text-[45px] 
        text-center lg:text-[35px] md:text-[26px] xsm:text-[25px]"
      >
        {text}
      </h2>
    </>
  );
}
