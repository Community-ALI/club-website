export default function ClubApplicationRadioField(props) {
  const { label, subtext, onChange, options, checkedValue } = props;

  return (
    <div className="flex flex-col gap-1 mt-8 px-3">
      <label className="text-lightBlue font-[Nunito] font-[800] text-[16px]">{label}</label>
      <p className="font-[Nunito] text-[14px] mb-[5px] tracking-wide">{subtext}</p>
      <div className="flex gap-16 mt-5">
        {options.map((option, index) => {
          const radioId = `radio-${option.replace(/\s+/g, '-')}-${index}`;
          return (
            <div key={index} className="flex items-center">
              <input
              id={radioId}
                type="radio"
                value={option}
                onChange={onChange}
                checked={checkedValue === option}
              />
              <label htmlFor={radioId} className="font-[Nunito] pl-2 text-[#000000] text-[14px] tracking-wider">{option}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
