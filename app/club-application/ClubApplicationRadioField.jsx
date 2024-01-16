export default function ClubApplicationRadioField(props) {
  const { label, subtext, onChange, options, checkedValue } = props;

  return (
    <div className="flex flex-col gap-1 mt-8 px-3">
      <label className="text-lightBlue font-[Nunito] font-[800] text-[16px]">{label}</label>
      <p className="font-[Nunito] text-[14px] mb-[5px] tracking-wide">{subtext}</p>
      <div className="flex gap-x-16 gap-y-8 xsm:gap-y-6 mt-5 flex-wrap xxsm:flex-col">
        {options.map((option, index) => {
          const uniqueId = `${label.replace(/\s+/g, '')}-${option.replace(/\s+/g, '')}-${index}`; 
          return (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                value={option}
                onChange={onChange}
                checked={checkedValue === option}
                id={uniqueId}
              />
              <label htmlFor={uniqueId} className="font-[Nunito] pl-2 text-[#000000] text-[14px] tracking-wider">{option}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
