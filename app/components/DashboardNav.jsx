import Link from "next/link";
import Button from "../ui/Button";
import Image from "next/image";
import { ConnBtn } from "../dashboard/wallet/ConnBtn";

const DashboardNav = () => {
  return (
    <div className="flex justify-between items-center px-2 md:px-4 py-4 text-xs md:text-sm">
      <Image
        src="/logo.png"
        alt="logo"
        height={1000}
        width={1000}
        className="w-8"
      />
      <div>
        <nav className="hidden md:flex items-center justify-center gap-4 md:gap-8 border border-neutral-500 rounded-full px-4 py-2">
          <Link href="#">Community</Link>
          <Link href="#">Analytics</Link>
          <Link href="#">Help</Link>
          <Button
            extra={
              "bg-gradient-to-r from-[#E5760E] to-[#F68CFF] text-stone-700 font-bold text-black"
            }>
            <span> Create Vote</span>
          </Button>
        </nav>
      </div>
      <ConnBtn />
    </div>
  );
};
export default DashboardNav;
