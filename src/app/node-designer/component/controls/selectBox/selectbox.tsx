import {OPTIONS} from "@/app/node-designer/component/controls/selectBox/options"

export default function SelectBox({className, style} : {className? : string, style?:any}) {
	return (
		<select className={className}
			style={{...style}}
		>
			{OPTIONS.map((option) => (
				<option className={className}
					key={option.value}
					value={option.value}>
					{option.name}
				</option>
			))}
		</select>
	);
};
