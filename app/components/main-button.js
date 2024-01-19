export default function MainButton({ isDisabled, text, onClick = () => {} }) {
  return (
    <>
      <button
        className={`text-offWhite text-[20px] px-[10px] py-[15px]
       ${isDisabled ? 'bg-gray' : 'bg-lightBlue hover:bg-darkBlue'} rounded-[80px] 
       tracking-widest ease-in-out duration-200 lg:w-[400px] lg:text-[18px] md:text-[16px] xsm:text-[15px] xsm:py-[12px]
       whitespace-nowrap w-[450px] xsm:w-[80%] xxsm:w-[85%]
       ${isDisabled ? 'disabled' : ''}`}
        onClick={onClick}
        disabled={isDisabled}
      >
        {text}
      </button>
    </>
  );
}