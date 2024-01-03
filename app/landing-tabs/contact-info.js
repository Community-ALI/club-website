import React, { useRef, useState } from "react";
import SectionTitle from "./section-title";

const ContactBox = ({ title, image, name, phone, email, emailto }) => (
  <div
    className="w-[200px] lg:w-[175px] md:w-[150px] flex flex-col justify-center text-center font-[Nunito] 
font-[500] text-darkBlue"
  >
    <p className="font-[600] md:text-[14px]">{title}</p>
    <img className="w-[100%] mt-[5px] mb-[10px]" src={image}></img>
    <div className="lg:text-[14px] md:text-[12px]">
      <p>{name}</p>
      <p>{phone}</p>
      <a href={emailto}>
        <p className="underline underline-offset-2 cursor-pointer">{email}</p>
      </a>
    </div>
  </div>
);

export default function ContactInfo() {
  return (
    <div className="animate-componentFade">
      <SectionTitle text="Contact Info"></SectionTitle>
      <div className="flex justify-center items-end gap-[80px] lg:gap-[60px] 
      md:gap-[50px] mt-[10px] sm:flex-col sm:items-center sm:gap-[30px]">
        <ContactBox
          title="Campus Life Director"
          image="images/Alejandra.png"
          name="Alejandra Espinoza"
          phone="209-575-6479"
          email="espinozaa@yosemite.edu"
          emailto="mailto:espinozaa@yosemite.edu"
        ></ContactBox>
        <ContactBox
          title="Program Assistant"
          image="images/Esmeralda.png"
          name="Esmeralda Cabadas"
          phone="209-575-7992"
          email="cabadase@mjc.edu"
          emailto="mailto:cabadase@mjc.edu"
        ></ContactBox>
        <ContactBox
          title="Student Center Technician"
          image="images/Miller.png"
          name="Mitch Miller"
          phone="209-575-7994"
          email="millermi@mjc.edu"
          emailto="mailto:millermi@mjc.edu"
        ></ContactBox>
      </div>
    </div>
  );
}
