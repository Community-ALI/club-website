export default function SaveAndContinueButton(props) {
  const { onClick, innerHTML, variant } = props;

  const variants = [
    {
      name: "default",
      backgroundColor: "bg-lightBlue",
      textColor: "text-white",
      borderColor: "border-none",
    },
    {
      name: "outline",
      backgroundColor: "bg-transparent",
      textColor: "text-lightBlue",
      borderColor: "border-lightBlue border-[2px]",
    },
    {
      name: "disabled",
      backgroundColor: "bg-gray-400",
      textColor: "text-white",
      borderColor: "border-none",
    },
    {
      name: "white-outline",
      backgroundColor: "bg-transparent",
      textColor: "text-white",
      borderColor: "border-white border-[2px]",
    },
  ];

  return (
    <div className="mt-8">
      <button
        onClick={onClick}
        className={`${variants[variant].backgroundColor} ${variants[variant].textColor} ${variants[variant].borderColor} font-bold px-8 py-4 rounded-full`}
      >
        {innerHTML}
      </button>
    </div>
  );
}
