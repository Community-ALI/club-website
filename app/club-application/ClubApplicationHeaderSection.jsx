export default function ClubApplicationHeaderSection(props) {
  const { sectionTitle } = props;

  return (
    <div>
      <div className="px-12">
        <h1 className="text-darkBlue font-sans font-bold text-[25px]">REGISTRATION PACKET</h1>
        <h2 className="text-lightBlue mb-8">{sectionTitle}</h2>
      </div>
      <hr className="border-darkBlue border-[3px]" />
    </div>
  );
}
