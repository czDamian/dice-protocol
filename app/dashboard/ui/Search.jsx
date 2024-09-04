import { CiSearch } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import MobileNavbar from "./MobileNavbar";

const Search = () => {
  return (
    <>
      <div className="hidden md:flex justify-end gap-3 font-bold items-center md:text-xs lg:text-sm">
        <div className="flex border justify-between rounded-full items-center px-2 font-normal">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="search"
            className="border-none outline-none p-2 w-44"
          />
          <CiSearch />
        </div>
        <FaRegBell className="text-2xl lg:text-3xl" />
        <IoIosSettings className="text-3xl lg:text-4xl" />
      </div>
      <MobileNavbar />
    </>
  );
};
export default Search;
