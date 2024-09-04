import { inter } from "./fonts/fonts";
import "./globals.css";

export const metadata = {
  title: "Dice Protocol",
  description: "Dice Protocol",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
