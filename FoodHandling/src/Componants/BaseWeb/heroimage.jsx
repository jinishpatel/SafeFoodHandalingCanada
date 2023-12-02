/** @format */

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './heroimage.css';
const heroimage = () => {
	return (
		<div className="hero">
			<Carousel showStatus={false} showThumbs={false} infiniteLoop autoPlay>
				<div>
					<img
						src="https://images.unsplash.com/opengraph/1x1.png?auto=format&fit=crop&q=60&blend=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1461354464878-ad92f492a5a0%3Fauto%3Dformat%26fit%3Dmax%26q%3D80%26blend%3D000000%26blend-alpha%3D10%26blend-mode%3Dnormal%26crop%3Dfaces%252Cedges%26h%3D630%26mark%3Dhttps%253A%252F%252Fimages.unsplash.com%252Fopengraph%252Fsearch-input.png%253Fauto%253Dformat%2526fit%253Dcrop%2526q%253D60%2526h%253D84%2526txt%253Dfood%252Bsafety%2526txt-align%253Dmiddle%25252Cleft%2526txt-clip%253Dellipsis%2526txt-color%253D000000%2526txt-pad%253D80%2526txt-size%253D40%2526txt-width%253D660%2526w%253D750%26mark-align%3Dmiddle%252Ccenter%26mark-w%3D750%26w%3D1200%26cs%3Dtinysrgb%26fm%3Djpg%26ixid%3DM3wxMjA3fDB8MXxzZWFyY2h8NHx8Zm9vZCUyMHNhZmV0eXxlbnwwfHx8fDE2OTc3MjExMDJ8MA%26ixlib%3Drb-4.0.3&blend-w=1&h=630&mark=https%3A%2F%2Fimages.unsplash.com%2Fopengraph%2Flogo.png&mark-align=top%2Cleft&mark-pad=50&mark-w=64&w=1200"
						alt="Image 1"
						className="hero-image"
					/>
				</div>
				<div>
					<img
						src="https://www.frost.com/wp-content/uploads/2022/06/World-Food-Safety-Day.jpg"
						alt="Image 2"
						className="hero-image"
					/>
				</div>
				<div>
					<img
						src="https://www.foodsafetynews.com/files/2019/06/logo-World-Food-Safety-Day-2019.jpg"
						alt="Image 3"
						className="hero-image"
					/>
				</div>
			</Carousel>
			<div className="footer-brake"></div>
		</div>
	);
};

export default heroimage;
