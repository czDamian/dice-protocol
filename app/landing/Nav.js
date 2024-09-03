import Link from "next/link";
import Button from "../ui/Button";
import { FaPager } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { BiSolidContact } from "react-icons/bi";

const links = [
  { text: "About", url: "./about",},
  { text: "Roadmap", url: "./roadmap",},
  { text: "Contact", url: "./contact",},
];
function Nav() {
  return (
    //
    <nav className="sticky top-5 md:top-10 xl:right-1/3 xl:left-1/3 flex items-center justify-evenly w-1/2 md:w-3/5 mx-auto xl:w-1/3 border-2 border-stone-200 rounded-full text-base backdrop-blur-sm">
      <ul className="list-none flex md:px-4 md:py-5 py-3 px-2 justify-between">
        {links.map((link) => (
          <li className="md:mx-3 mx-1" key={link.text}>
            <Link href={link.url}>
              <span className="md:block hidden">{link.text}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Button
        extra={"bg-gradient-to-r from-[#E5760E] to-[#F68CFF] text-stone-700"}
      >
        <span className="md:block hidden"> Connect Wallet</span>
      </Button>
    </nav>
  );
}

export default Nav;
