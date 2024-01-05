import ClubApplicationHeaderSection from "./ClubApplicationHeaderSection";
import ClubApplicationTextField from "./ClubApplicationTextField";
import { useState } from "react";
import RoundedButton from "@components/RoundedButton";

export default function ClubAgreemet() {
  const [clubAgreementSignatures, setClubAgreementSignatures] = useState([
    {
      role: "Club President",
      signature: "",
      date: "",
    },
    {
      role: "Club Advisor",
      signature: "",
      date: "",
    },
  ]);

  function ChangeSignatureField(field, index, e) {
    setClubAgreementSignatures(
      clubAgreementSignatures.map((signature, signatureIndex) =>
        signatureIndex === index ? signature : e.target.value
      )
    );
  }

  return (
    <div className="py-12">
      <ClubApplicationHeaderSection sectionTitle="Club Agreement" />
      <ClubAgreementText />
      <div className="px-12">
        {clubAgreementSignatures.map((signature, index) => {
          return (
            <div className="flex flex-wrap gap-[60px] justify-center" key={index}>
              <ClubApplicationTextField
                label={clubAgreementSignatures[index].role + " Signature"}
                onChange={(e) => ChangeSignatureField("signature", index, e)}
              />
              <ClubApplicationTextField label="Date" onChange={(e) => ChangeSignatureField("date", index, e)} />
            </div>
          );
        })}
      </div>
        <hr />
        <div className="px-12">
            <RoundedButton innerHTML="Save and Continue" variant={0} />
        </div>
      </div>
  );
}

function ClubAgreementText() {
  return (
    <div className="px-12 mt-8">
      <p>
        The membership of the MJC Business Club has agreed to abide by the
        Inter-Club Council’s Standing Orders and the ASMJC Constitution and
        Bylaws.
      </p>

      <p>
        We are aware of and agree and abide by the following rights, privileges,
        and responsibilities:
      </p>

      <ol>
        <li>
          <p>
            We must attend all Inter Club Council Meetings. If we are absent
            from three consecutive meetings, our active status shall be
            suspended and our funds will be frozen. Meetings are held the second
            Friday of the month from 1pm-2:30 pm in the East Campus Fireside
            Lounge. With exception of March 10th which will be from 3pm-4:30pm.
            (mandatory) (change this)
          </p>
        </li>
        <br />
        <li>
          <p>
            If our club is inactive for two consecutive semesters, all club
            funds and assets shall be absorbed into the ASMJC club development
            fund.
          </p>
        </li>
        <br />
        <li>
          <p>
            We shall ensure that all records pertaining to our club, including
            but not limited to our Constitution and Bylaws, Officer Roster, and
            Membership Roster will be kept updated and we shall promptly inform
            the Club Coordinator of any changes.
          </p>
        </li>
        <br />
        <li>
          <p>
            All club funds shall be kept in an on-campus account in the Business
            Office under the support of ASMJC.
          </p>
        </li>
        <br />
        <li>
          <p>
            We must have an active Advisor who attends all club functions and
            verifies officer eligibility.
          </p>
        </li>
        <br />
        <li>
          <p>
            Club officers must maintain a 2.0 grade point average or higher to
            hold office.
          </p>
        </li>
        <br />
        <li>
          <p>Club officers must be enrolled in 5 units to hold office.</p>
        </li>
        <br />
      </ol>
    </div>
  );
}
