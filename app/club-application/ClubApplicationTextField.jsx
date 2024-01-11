export default function ClubApplicationTextField(props) {
  const { label, subtext, value, onChange } = props;

  return (
    <div className="flex flex-col gap-1 mt-8 lg:mt-6">
      <label className="text-lightBlue font-[Nunito] font-[800] text-[16px] xsm:text-[15px]">{label}</label>
      <p className="font-[Nunito] text-[14px] mb-[5px] tracking-wide">{subtext}</p>
      <input
        type="text"
        className="h-[40px] xsm:h-[35px] w-[300px] xsm:w-[280px] xxsm:w-[250px] md:text-[13px] px-[10px] py-[5px] text-[14px] border-solid 
        border-[1px] border-lightGray bg-#FFFFFF"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
