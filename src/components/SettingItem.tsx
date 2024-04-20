import Helper from "./../components/Helper.tsx";
const SettingItem = (props:{
	type: string,
	title?: string,
	help?: string,
	on?: boolean,
	event?: any,
	numberValue?: number,
	min?: number,
	max?: number,
	group?: any
	}) => {	
	const {type, title, help, on, event, numberValue, min, max, group} = props;

	const fixNumber = (n: number) => {
		if(n >= max){
			return max;
		}else if(n > min){
			return n;
		}else{
			return min;
		}
	}

	switch(type){
		case "group":
			return(
	  			<div className="p-1 py-3">
	      			<div className="w-full flex items-center justify-center border border-primary-300 dark:border-primary-800 shadow-md py-4">
	      				<input type="checkbox" onChange={(e)=>{event(e.target.checked)}} defaultChecked={group.active}/><span className="px-2">{group.title}</span>
	      			</div>
	  			</div>
			)
		break;
		case "number":
			return(
			  		<div className="py-3">
			  			<div className="flex items-center flex-wrap">
			  				<div className="w-full">
			  					<span className="">{title}</span>
			  				</div>
			  				<div className="w-full flex items-center p-3">
			  					<div className="flex w-full items-center">
			  						<div className="w-full">
			  							<input onChange={(e)=>{event(fixNumber(parseInt(e.target.value)))}} type="range" className="w-full border border-primary-300 dark:border-primary-800 bg-primary-200 dark:bg-primary-900 shadow-inner rounded-md" defaultValue={numberValue} min={min} max={max}/>
			  						</div>
			  						<p className="w-10 text-right">{numberValue}</p>
			  					</div>
			  				</div>
			  			</div>
			  		</div>
			)
		break;
		case "toggle":
		default:
			return(
		  		<div className="py-3">
		  			<div className="flex items-center">
		  				<div className="w-full flex items-center">
		  					<span className="">{title}</span>
		  					{help ? <Helper help={help}/> : <></>}
		  				</div>
		  				<div className="w-full flex justify-end h-6">
		  					<div onClick={event} className={`cursor-pointer border border-primary-300 dark:border-primary-700 flex items-center w-12 shadow-inner rounded-full transition-all duration-300 ${on ? "bg-primary-300 dark:bg-primary-900" : "shadow-inner bg-primary-300 dark:bg-primary-900"}`}><div className={`shadow-lg border border-primary-300 dark:border-primary-700 transition-all rounded-full w-6 h-6 ${on ? "bg-sky-500" : "bg-primary-200 dark:bg-primary-700"} ${on ? "translate-x-0" : "translate-x-full"}`}></div></div>
		  				</div>
		  			</div>
		  		</div>
			)
		break;
	}
}
export default SettingItem;