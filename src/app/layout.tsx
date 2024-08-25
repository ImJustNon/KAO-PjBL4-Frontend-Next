import type { Metadata } from "next";
import { Inter, Itim } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export const metadata: Metadata = {
	title: "Register Student",
	description: "A register student data page from project's KAO",
};

const itim = Itim({
	weight: "400",
	subsets: ["thai", "latin", "latin-ext", "vietnamese"]
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="en" >
			<body className={`bg-cover bg-[url('../assets/images/hee.jpg')] ${itim.className}`}>{children}</body>
		</html>
	);
}
