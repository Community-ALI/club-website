

export default function SaveAndContinueButton(props) {
  const { onClick, innerHTML, variant } = props;

  const variants = [
    {
      name: "default",
      backgroundColor: "bg-lightBlue",
      textColor: "text-white",
    },
    {
      name: "outline",
      backgroundColor: "bg-transparent",
      textColor: "text-lightBlue",
    },
    {
      name: "disabled",
      backgroundColor: "bg-gray-400",
      textColor: "text-white",
    },
    {
      name: "white-outline", 
      backgroundColor: "bg-transparent",
      textColor: "text-white",
    }
  ];

  return (
    <div className="mt-8">
      <button onClick={onClick} className={`${variants[variant].backgroundColor} ${variants[variant].textColor} font-bold px-8 py-4 rounded-full`}> 
        {innerHTML}
      </button>
    </div>
  );
}
