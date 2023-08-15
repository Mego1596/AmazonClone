import React, { ReactElement } from "react";
import Header from "../navbar/Header";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

interface Props {
	children: ReactElement;
}

const RootLayout = ({ children }: Props) => {
	return (
		<>
			<Navbar />
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default RootLayout;
