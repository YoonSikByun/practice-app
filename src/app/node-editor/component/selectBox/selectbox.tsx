import {OPTIONS} from "@/app/node-editor/component/selectBox/options"

const SelectBox = () => {
	return (
		<select className='sidebar-deck-option-row'>
			{OPTIONS.map((option) => (
				<option className='sidebar-deck-option-row'
					key={option.value}
					value={option.value}>
					{option.name}
				</option>
			))}
		</select>
	);
};


export default SelectBox