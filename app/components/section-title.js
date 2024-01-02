export default function SectionTitle ({ text }) {
  return (
    <>
      <h2
        className="text-lightBlue text-[45px] 
        text-center lg:text-[35px] md:text-[28px] xsm:text-[26px]"
      >
        {text}
      </h2>
    </>
  );
}
