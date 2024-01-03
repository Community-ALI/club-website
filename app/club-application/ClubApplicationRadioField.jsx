export default function ClubApplicationRadioField(props) {
  const { label, subtext, onChange, options, checkedValue } = props;

  return (
    <div className="flex flex-col gap-2 mt-8">
      <h4 className="text-lightBlue font-bold text-lg">{label}</h4>
      <p>{subtext}</p>
      <div className="flex gap-16 mt-8">
        {options.map((option, index) => {
          return (
            <div key={index}>
              <input
                type="radio"
                value={option}
                onChange={onChange}
                checked={checkedValue === option}
              />
              <label>{option}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
