import ClubApplicationHeaderSection from "./ClubApplicationHeaderSection";

export default function SubmitApplication(props) {
  const { form } = props;
  return (
    <div className="py-12">
      <ClubApplicationHeaderSection title="SUBMIT APPLICATION" />
      <p className="px-12">
        Before you submit your application, please take a moment to carefully
        review all the information you have provided. Make sure that every
        detail is accurate and complete, as you will not be able to make any
        edits once the application is submitted. Checking for typos and
        incorrect data can help prevent any delays or issues with the processing
        of your application.{" "}
      </p>
      <hr />
      <div className="flex justify-between px-12 my-8">
        <h2>FOR SPRING SEMESTER 2024</h2>
        <a className="text-lightBlue" href="https://youtu.be/dQw4w9WgXcQ">
          Click here to receive a copy
        </a>
      </div>
      {Object.entries(form).map(([key, value]) => (
        <ReviewSection key={key} title={key} form={value} />
      ))}
    </div>
  );
}

function ReviewSection(props) {
  const { title, form } = props;
  function formatCamelCase(input) {
    const spacedSentence = input.replace(/([a-z])([A-Z])/g, '$1 $2');
    return spacedSentence.charAt(0).toUpperCase() + spacedSentence.slice(1);
  }
  return (
    <div className="mx-12 border-solid border-[2px] p-12 border-lightGray">
      <h1 className="mb-12 text-[20px]">{formatCamelCase(title).toUpperCase()}</h1>
      {Object.entries(form).map(([key, value]) => (
        <div key={key} className="flex border-b-2 border-solid border-lightGray py-2">
          <p className="flex-1">{formatCamelCase(key)}</p>
          <p className="flex-1">{formatCamelCase(value)}</p>
        </div>
      ))}
    </div>
  );
}
