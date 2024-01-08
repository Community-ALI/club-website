export default function ClubApplicationHeaderSection(props) {
  const { sectionTitle } = props;

  return (
    <div>
      <div>
        <h1 className="text-darkBlue text-[20px]">Registration Packet</h1>
        <h2 className="text-lightBlue">{sectionTitle}</h2>
      </div>
      <hr className="border-darkBlue border-[1px] mt-[20px]" />
    </div>
  );
}
