export default function ClubApplicationHeaderSection(props) {
  const { sectionTitle } = props;

  return (
    <div>
      <div>
        <h1 className="text-darkBlue text-[22px]">Registration Packet</h1>
        <h2 className="text-lightBlue text-[18px]">{sectionTitle}</h2>
      </div>
      <hr className="border-darkBlue border-[1px] mt-[20px]" />
    </div>
  );
}
