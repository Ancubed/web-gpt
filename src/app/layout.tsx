import "./globals.css";
import { Roboto } from "next/font/google";

import Header from "@/components/Header";

const roboto = Roboto({ weight: "700", subsets: ["latin"] });

export const metadata = {
  title: "Web GPT App",
  description: "Simple home GPT web app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={roboto.className}>
        <Header className="py-2 px-10" />
        <main className="md:mb-10 md:mx-10 h-96 flex grow p-4 bg-gradient-to-t from-sky-500 to-indigo-500 rounded-sm">
          {children}
        </main>
        {/* <Footer className="py-2 px-10"/> */}
      </body>
    </html>
  );
}
