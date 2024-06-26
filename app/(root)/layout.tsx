import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";
import Topbar from "../components/shared/Topbar";
import Rightsidebar from "../components/shared/Rightsidebar";
import Leftsidebar from "../components/shared/Leftsidebar";
import Bottombar from "../components/shared/Bottombar";

export const metadata = {
  title: "ZapText",
  description: "A next 13 microblogging application",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <Topbar />
          <main className="flex flex-row">
            <Leftsidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <Rightsidebar />
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
