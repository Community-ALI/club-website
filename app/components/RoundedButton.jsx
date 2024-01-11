export default function SaveAndContinueButton(props) {
  const { onClick, innerHTML, variant } = props;

  const variants = [
    {
      name: "default",
      backgroundColor: "bg-lightBlue",
      textColor: "text-white",
      borderColor: "border-none",
      hoverBackgroundColor: "hover:bg-darkBlue",
    },
    {
      name: "outline",
      backgroundColor: "bg-transparent",
      textColor: "text-lightBlue",
      borderColor: "border-lightBlue border-[2px]",
      hoverBackgroundColor: "hover:text-darkBlue hover:border-darkBlue",
    },
    {
      name: "disabled",
      backgroundColor: "bg-gray-400",
      textColor: "text-white",
      borderColor: "border-none",
      hoverBackgroundColor: "",
    },
    {
      name: "white-outline",
      backgroundColor: "bg-transparent",
      textColor: "text-white",
      borderColor: "border-white border-[2px]",
      hoverBackgroundColor: "hover:bg-white hover:text-darkBlue",
    },
  ];

  return (
    <div className="mt-8">
      <button
        onClick={onClick}
        className={`${variants[variant].backgroundColor} ${variants[variant].textColor} ${variants[variant].borderColor} ${variants[variant].hoverBackgroundColor} tracking-widest text-[12px] xsm:text-[11px] px-8 xsm:px-6 py-3 rounded-full duration-200 ease`}
      >
        {innerHTML}
      </button>
    </div>
  );
}
