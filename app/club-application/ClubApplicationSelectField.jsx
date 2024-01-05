export default function ClubApplicationSelectField(props) {
  const { label, subtext, value, onChange, options } = props;

  return (
    <div className="flex flex-col gap-2 mt-8 flex-1">
      <label className="text-lightBlue font-bold text-lg">{label}</label>
      <p>{subtext}</p>
      <select
        className="h-[40px] w-[350px] border-solid border-[1px] border-lightGray bg-#FFFFFF"
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}