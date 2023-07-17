import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import ProductCard from '../Card/productCard';
import styles from './SliderCard.module.css';

function ProductSlider({ data = [] }) {
	const [sliderSettings, setSliderSettings] = useState(getSliderSettings);

	function getSliderSettings() {
		return window.innerWidth <= 768
			? {
					dots: false,
					className: 'custom-slick-slider-product',
					infinite: true,
					speed: 500,
					slidesToShow: 3,
					slidesToScroll: 3,
			  }
			: {
					dots: false,
					className: 'custom-slick-slider-product',
					infinite: true,
					speed: 500,
					slidesToShow: data.length > 5 ? 5 : 3,
					slidesToScroll: data.length > 5 ? 5 : 3,
			  };
	}

	useEffect(() => {
		function handleWindowResize() {
			setSliderSettings(getSliderSettings());
		}

		// Add event listener for window resize
		window.addEventListener('resize', handleWindowResize);

		// Clean up the event listener when the component is unmounted
		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	return (
		<Slider {...sliderSettings}>
			{data.map((item, index) => (
				<ProductCard data={item} key={index} />
			))}
		</Slider>
	);
}

export default ProductSlider;
