import React from "react";
import { Carousel } from "react-responsive-carousel";
import sliderImg_1 from "../../images/slider/sliderImg_1.jpg";
import sliderImg_2 from "../../images/slider/sliderImg_2.jpg";
import sliderImg_3 from "../../images/slider/sliderImg_3.jpg";
import Image from "next/image";

const Banner = () => {
	return (
		<div className="relative">
			<Carousel
				autoPlay
				infiniteLoop
				showStatus={false}
				showIndicators={false}
				showThumbs={false}
				interval={3000}
			>
				<div>
					<Image src={sliderImg_1} alt="img_1" priority={true} />
				</div>
				<div>
					<Image src={sliderImg_2} alt="img_2" priority={true} />
				</div>
				<div>
					<Image src={sliderImg_3} alt="img_3" priority={true} />
				</div>
			</Carousel>
			<div className="w-full h-40 bg-gradient-to-t from-gray-600 to-transparent absolute bottom-0 z-20"></div>
		</div>
	);
};

export default Banner;
