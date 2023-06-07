import Navbar from "@/components/Navbar";
import "./globals.css";
import localFont from "next/font/local";
import Providers from "@/components/Providers";

const kapel = localFont({ src: "../../public/Kapel.ttf" });

export const metadata = {
  title: "Bob The Developer",
  description:
    "Bob The Developer is an NFT Collection for Github profile pictures",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${kapel.className} max-w-7xl mx-auto my-0 px-6`}>
          <Navbar />
          <main>{children}</main>
        </body>
      </Providers>
    </html>
  );
}
