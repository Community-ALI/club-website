export default function ClubApplicationTextField(props) {
  const { label, subtext, value, onChange } = props;

  return (
    <div className="flex flex-col gap-1 mt-8">
      <label className="text-lightBlue font-[Nunito] font-[800] text-[16px]">{label}</label>
      <p className="font-[Nunito] text-[14px] mb-[5px] tracking-wide">{subtext}</p>
      <input
        type="text"
        className="h-[40px] w-[300px] px-[10px] py-[5px] text-[14px] border-solid border-[1px] border-lightGray bg-#FFFFFF"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
