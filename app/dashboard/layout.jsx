import { Poppins } from "@next/font/google";
import DashboardNav from "../components/DashboardNav";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata = {
  title: "Dashboard || Dice Protocol",
  description: "Dice Protocol",
};

export default function Layout({ children }) {
  return (
    <div
      className={`px-4 sm:px-6 md:px-8 lg:px-16 bg-no-repeat bg-cover w-full min-h-[100vh] ${poppins.className}`}
      style={{ backgroundImage: "url('/bg.png')", backgroundPosition: "" }}>
      <DashboardNav />
      <main>{children}</main>
    </div>
  );
}
