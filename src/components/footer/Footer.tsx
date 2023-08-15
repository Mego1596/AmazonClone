import React from "react";
import Image from "next/image";
import logo from "../../images/logo.png";
const Footer = () => {
	return (
		<div className="w-full h-20 bg-amazon_light text-gray-300 flex items-center justify-center">
			<Image className="w-24" src={logo} alt="logo" priority={true} />
			<p className="text-sm -mt-4">
				All rights reserved{" "}
				<a
					className="hover:text-white hover:underline decoration-[1px] cursor-pointer"
					href="https://reactbd.com"
					target="_blank"
				>
					@reactbd.com
				</a>
			</p>
		</div>
	);
};

export default Footer;
