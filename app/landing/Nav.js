import Link from "next/link";
import Button from "../ui/Button";
import clsx from "clsx";

const links = [
  { text: "About", url: "./about" },
  { text: "Roadmap", url: "./roadmap" },
  { text: "Contact", url: "./contact" },
];
export default function Nav() {
  return (
    <>
      <nav className="sticky hidden top-5 md:top-10 xl:right-1/3 xl:left-1/3 md:flex items-center justify-evenly w-1/2 md:w-3/5 mx-auto xl:w-1/3 border-2 border-stone-200 rounded-full text-base backdrop-blur-sm">
        <ul className="list-none flex md:px-4 md:py-5 py-3 px-2 justify-between">
          {links.map((link) => (
            <li className="md:mx-3 mx-1" key={link.text}>
              <Link href={link.url}>
                <span>{link.text}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Button
          extra={"bg-gradient-to-r from-[#E5760E] to-[#F68CFF] text-stone-700"}
        >
          <span> Connect Wallet</span>
        </Button>
      </nav>
    </>
  );
}

export function MobileNav() {
  <nav
    className={clsx(
      "w-[100vw] h-[100vh] backdrop-blur-sm absolute bg-red-500"
      //   isOpen && "block",
      //   !isOpen && "hidden"
    )}
  >
    <ul className="list-none flex md:px-4 md:py-5 py-3 px-2 justify-between">
      {links.map((link) => (
        <li className="md:mx-3 mx-1" key={link.text}>
          <Link href={link.url}>
            <span>{link.text}</span>
          </Link>
        </li>
      ))}
    </ul>
    <Button
      extra={"bg-gradient-to-r from-[#E5760E] to-[#F68CFF] text-stone-700"}
    >
      <span> Connect Wallet</span>
    </Button>
  </nav>;
}
