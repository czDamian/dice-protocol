import Link from "next/link";
import Button from "../../app/ui/Button";
import clsx from "clsx";
import { ConnBtn } from "@/app/dashboard/wallet/ConnBtn";

const links = [
  { text: "About", url: "./#about" },
  { text: "Roadmap", url: "./#roadmap" },
  { text: "FAQ", url: "./#faq" },
];
export default function Nav() {
  return (
    <>
      <nav className="fixed hidden z-10 right-[20%] top-5 md:top-10 xl:right-1/3 xl:left-1/3 md:flex items-center justify-evenly w-1/2 md:w-3/5 mx-auto xl:w-1/3 border-2 border-stone-200 rounded-full text-base backdrop-blur-sm">
        <ul className="list-none flex md:px-4 md:py-5 py-3 px-2 justify-between">
          {links.map((link) => (
            <li className="md:mx-3 mx-1" key={link.text}>
              <Link href={link.url}>
                <span>{link.text}</span>
              </Link>
            </li>
          ))}
        </ul>
        <ConnBtn />
      </nav>
    </>
  );
}
