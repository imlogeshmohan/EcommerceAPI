import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategories } from "../../../services";
import FooterList from "./FooterList";
// import Subscribe from "./Subscribe";
import { meta, fb, linkedin, youtube, insta, privacy } from "./svg";

const StayQuort = "Stay current with our latest insights";
const WeRespectPrivacy = "We respect your privacy";

// const Company = [
//   {
//     sno: 2,
//     title: "Company",
//     serv: ["Home", "About", "Team"],
//     link: ["#", "#", "#"],
//   },
//   {
//     sno: 3,
//     title: "Support",
//     serv: [
//       "Contact",
//       "Frequently Asked Questions",
//       "Join Affilate program",
//       "Work With Us",
//       "Terms and Conditions",
//     ],
//     link: ["#", "#", "#", "#", "#"],
//   },
// ];

function NEwFooter({ trending }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);
  return (
    <div className="bg-black text-gray-300 font-semibold sm:p-10 sm:pt-20 pt-10 p-5">
      <div className="flex flex-col items-center gap-6">
        <h1 className="sm:text-lg text-sm">{StayQuort}</h1>
        {/* <Subscribe /> */}
        <div className="flex gap-3 items-center">
          {/* <svg width={24} height={24}>
            {privacy}
          </svg> */}
          <h1 className="text-sm">{WeRespectPrivacy}</h1>
        </div>
      </div>
    </div>
  );
}

export default NEwFooter;
