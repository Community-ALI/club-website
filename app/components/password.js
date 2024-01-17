import React from 'react';

export default function PasswordRequirements({ fulfilledRequirements }) {
  return (
    <div className='gap-10 mt-6'>
      <p className={`text-center text-[13px] ${fulfilledRequirements[0] ? "text-darkBlue" : "text-[#ff0000]"} mt-[5px] xsm:text-[10px] font-[Nunito] font-[700]`}>
        Password must be at least 8 characters long.
      </p>
      <p className={`text-center text-[13px] ${fulfilledRequirements[2] ? "text-darkBlue" : "text-[#ff0000]"} mt-[5px] xsm:text-[10px] font-[Nunito] font-[700]`}>
        Password must have at least one number.
      </p>
      <p className={`text-center text-[13px] ${fulfilledRequirements[1] ? "text-darkBlue" : "text-[#ff0000]"} mt-[5px] xsm:text-[10px] font-[Nunito] font-[700]`}>
        Password must have at least one capital letter.
      </p>
    </div>
  );
}