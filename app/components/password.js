import React from "react";

export default function PasswordRequirements({ fulfilledRequirements }) {
  return (
    <div className="mt-8 flex justify-center gap-12 md:flex-col md:gap-0">
      <div className="flex flex-col justify-start">
        <p
          className={`text-center text-[14px] lg:text-[13px] ${
            fulfilledRequirements[0] ? "text-darkBlue" : "text-[#ff0000]"
          } mt-[5px] xsm:text-[12px] font-[Nunito] font-[700]`}
        >
          Must have at least 6 characters.
        </p>
        <p
          className={`text-center text-[14px] lg:text-[13px] ${
            fulfilledRequirements[2] ? "text-darkBlue" : "text-[#ff0000]"
          } mt-[5px] md:mt-2 xsm:text-[12px] font-[Nunito] font-[700]`}
        >
          Must have at least one number.
        </p>
      </div>

      <div className="flex flex-col justify-start">
        <p
          className={`text-center text-[14px] lg:text-[13px] ${
            fulfilledRequirements[1] ? "text-darkBlue" : "text-[#ff0000]"
          } mt-[5px] md:mt-2 xsm:text-[12px] font-[Nunito] font-[700]`}
        >
          Must have at least one capital letter.
        </p>
        <p
          className={`text-center text-[14px] lg:text-[13px] ${
            fulfilledRequirements[3] ? "text-darkBlue" : "text-[#ff0000]"
          } mt-[5px] md:mt-2 xsm:text-[12px] font-[Nunito] font-[700]`}
        >
          Must match the confirm password.
        </p>
      </div>
    </div>
  );
}
