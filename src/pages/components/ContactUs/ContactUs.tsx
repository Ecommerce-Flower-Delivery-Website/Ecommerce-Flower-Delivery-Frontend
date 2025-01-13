import React from "react";
import Address from "./components/Address";
import CallBack from "./components/CallBack";
import Phone from "./components/Phone";
import ContactImg from "./../../../assets/contact-img.jpg";
import { contactImgs } from "./data/contact.imgs";

const ContactUs: React.FC = () => {
  return (
    <div className="aj-contact-us grid grid-cols-1 lg:grid-cols-2">
      <div className="aj-left-part flex flex-col order-2 lg:order-none">
        <CallBack />
        <div className="grid grid-cols-2 flex-grow">
          <Phone />
          <Address />
        </div>
      </div>
      <div className="aj-right-part flex flex-col order-1 lg:order-none">
        <div className="img-container flex-grow">
          <img src={ContactImg} alt="Kyiv LuxeBouquets" className="w-full h-full object-cover" />
        </div>
        <div className="aj-follow flex h-[78px]">
          <p className="w-2/4 flex items-center justify-center border border-[#121212] text-4xl">
            Follow us
          </p>
          <ul className="flex w-2/4 justify-center items-center gap-8 border border-[#121212]">
            {contactImgs.map((img: string, index: number) => (
              <li key={index}>
                <a href="#">
                  <img src={img} alt={`Social icon ${index + 1}`} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
