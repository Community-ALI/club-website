export default function MainButton({ text, onClick = () => {} }) {
  return (
    <>
      <button
        className="text-offWhite text-[20px] py-[15px] md:py-[12px] xxsm:py-[10px]
       bg-lightBlue hover:bg-darkBlue rounded-[80px] tracking-widest
       ease-in-out duration-200 lg:text-[18px] md:text-[16px] xsm:text-[14px] 
       lg:w-[420px] md:w-[380px] sm:w-[340px] xsm:w-[300px] xxsm:w-[280px] whitespace-nowrap w-[450px]"
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
}
