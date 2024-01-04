export default function ClubApplicationTextField(props) {
  const { label, subtext, value, onChange } = props;

  return (
    <div className="flex flex-col gap-2 mt-8 flex-1">
      <label className="text-lightBlue font-bold text-lg">{label}</label>
      <p>{subtext}</p>
      <input
        type="text"
        className="h-[40px] w-[350px] border-solid border-[1px] border-lightGray bg-#FFFFFF"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
