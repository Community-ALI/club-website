import ClubApplicationHeaderSection from "./ClubApplicationHeaderSection";

export default function SubmitApplication() {
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
        <a href="https://youtu.be/dQw4w9WgXcQ"></a>
      </div>
    </div>
  );
}

function ReviewSection(props) {
  const { title, form } = props;
  return (
    <div className="mx-12 border-solid border-[2px] border-lightGray">
      <h1>{title.toUpper()}</h1>
      {() => {
        let fields = [];
        const formFields = Object.keys(form);
        for (var index in form) {
          fields.push(
            <div className="flex border-b-2 border-solid">
              <p>{formFields[index]}</p>
              <p>{form[index]}</p>
            </div>
          );
        }
      }}
    </div>
  );
}
