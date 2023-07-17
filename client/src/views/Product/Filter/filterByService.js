import { useState } from 'react'
import styles from './Filter.module.css'

function FilterByFormality({ filters, onChange }) {
	const options = [
		{ value: 'isPromotion', label: 'Có khuyến mãi' },
		{ value: 'freeShip', label: 'Miễn phí vận chuyển' },
	];
	const [popoverVisible, setPopoverVisible] = useState(false)

	const handleOptionToggle = (optionValue) => {
		const newFilters = { ...filters, [optionValue]: !filters[optionValue] };
		onChange(newFilters);
	}

	// Function to toggle popover visibility
	const togglePopover = () => {
		setPopoverVisible((prevState) => !prevState);
	}

	return (
		<>
        <br />
			<button className={styles.label} onClick={togglePopover}>
				Dịch vụ
			</button>
			{/* Conditionally render the popover content */}
			{popoverVisible && (
				<div className={styles.content}>
					{options.map((option) => (
						<div key={option.value} className={styles.serviceOption}>
							<input
								type='checkbox'
								checked={!!filters[option.value]}
								onChange={() => handleOptionToggle(option.value)}
								id={option.value}
							/>
							<label htmlFor={option.value}>{option.label}</label>
						</div>
					))}
				</div>
			)}
		</>
	);
}

export default FilterByFormality;
