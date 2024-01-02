export default function MainButton({ text, onClick = () => { } }) {
  return (
    <>
      <button
        className="text-offWhite text-[20px] px-[100px] py-[15px]
       bg-lightBlue hover:bg-darkBlue rounded-[80px] tracking-widest
       ease-in-out duration-200 lg:scale-[.9] md:scale-[.8]
       xsm:px-[60px] xsm:text-[18px] whitespace-nowrap w-[450px]"
      onClick={onClick}
      >
        {text}
      </button>
    </>
  );
}
