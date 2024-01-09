import ClubApplicationHeaderSection from "./ClubApplicationHeaderSection";
import ClubApplicationTextField from "./ClubApplicationTextField";
import { useState } from "react";
import RoundedButton from "@components/RoundedButton";

export default function ClubAgreemet(props) {
  const {club, updateClub} = props;
  const [clubAgreementSignatures, setClubAgreementSignatures] = useState(club.clubAgreement);

  function ChangeSignatureField(field, index, e) {
    setClubAgreementSignatures(
      clubAgreementSignatures.map((signature, signatureIndex) =>
        signatureIndex === index ? signature : e.target.value
      )
    );
  }

  function handleSubmit() {
    // update the club object
    club.clubAgreement = clubAgreementSignatures;
    updateClub(club);
  }

  return (
    <div className="p-12">
      <ClubApplicationHeaderSection sectionTitle="Club Agreement" />
      <ClubAgreementText />
      <div>
        {clubAgreementSignatures.map((signature, index) => {
          return (
            <div className="flex flex-wrap gap-[60px] justify-start px-3" key={index}>
              <ClubApplicationTextField
                label={clubAgreementSignatures[index].role + " Signature"}
                onChange={(e) => ChangeSignatureField("signature", index, e)}
              />
              <ClubApplicationTextField label="Date" onChange={(e) => ChangeSignatureField("date", index, e)} />
            </div>
          );
        })}
      </div>
        <hr className="border-lightGray border-[.5px] mt-[50px]"></hr>
        <div>
            <RoundedButton innerHTML="Save and Continue" variant={0} onClick={() => handleSubmit()} />
        </div>
      </div>
  );
}

function ClubAgreementText() {
  return (
    <div className="px-3 mt-8 font-[Nunito]">
      <p>
        The membership of our club and its officers has agreed to abide by the
        Inter-Club {"Council's"} Standing Orders and the ASMJC Constitution and
        Bylaws.
      </p> 
      <br></br>

      <p>
        We are aware of and agree and abide by the following rights, privileges,
        and responsibilities:
      </p>
      <br></br>
      <b>
          <p>
            1. We must attend all Inter Club Council Meetings. If we are absent
            from one consecutive meeting, our active status shall be
            suspended and our funds will be frozen. Meetings are held the second
            Friday of the month from 1-2pm in the East Campus Student Center on Feb 9th, March 8th, and April 12th.
          </p>
        <br></br>
          <p>
            2. If our club is inactive for two consecutive semesters, all club
            funds and assets shall be absorbed into the ASMJC club development
            fund.
          </p>
          <br></br>
          <p>
            3. We shall ensure that all records pertaining to our club, including
            but not limited to our Constitution and Bylaws, Officer Roster, and
            Membership Roster will be kept updated and we shall promptly inform
            the Club Coordinator of any changes.
          </p>
          <br></br>
          <p>
            4. All club funds shall be kept in an on-campus account in the Business
            Office under the support of ASMJC.
          </p>
          <br></br>

          <p>
            5. We must have an active Advisor who attends all club functions and
            verifies officer eligibility.
          </p>

          <br></br>

          <p>
            6. Club officers must maintain a 2.0 grade point average or higher to
            hold office.
          </p>

          <br></br>

          <p>7. Club officers must be enrolled in 5 units to hold office.</p>

          <br></br>
          </b>

    </div>
  );
}
