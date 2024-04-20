import { useState, useEffect, useRef} from "react";
import {TypeSettings,TypeKanji} from "./../ts/types.tsx";
const MeanRead = (props: {
	kanji: TypeKanji,
	settings: TypeSettings,
	property: string,
	onHandleReadings: any,
	firstInOrder: boolean
	}) => {
	const {kanji, settings, property, onHandleReadings, firstInOrder} = props;

	const inputRef = useRef(null);

	const normalize = (str: string) =>{
		return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[-']/g, "").toLowerCase();
	}

	const stringToArray = (str: string) => {

		if(str.split(", ")){
			return str.split(", ");
		}else{
			return [str];
		}
	}

	const [input,setInput] = useState<string>("");
	const [word,setWord] = useState<string[]>(stringToArray(kanji[property as keyof TypeKanji]));
	const [valid,setValid] = useState<boolean>(false);

	const handleSetInput = (ip: string) => {
		setInput(ip);
	}

	const validation = (wo: string[],ip: string) => {
		for(let i=0;i<wo.length;i++){
			if(normalize(wo[i]) === normalize(ip)){
				return true;
			}
		}
		return false;
	}

	useEffect(()=>{
		setValid(validation(word,input));
	},[word,input]);

	useEffect(()=>{
		onHandleReadings({property: property, valid: valid});
	},[valid]);

	useEffect(()=>{
		setWord(stringToArray(kanji[property as keyof TypeKanji]));
		setInput("");
		if(firstInOrder && inputRef){
			inputRef.current.focus();
		}
	},[kanji]);

	return(
	// @ts-ignore
      <div className={`${settings.activeItems[property] ? "flex" : "hidden"} group w-full p-3 min-h-20 items-center justify-center`}>
      	<div className="w-full">
	        <p className={`transition-all ${settings.showHints ? "opacity-30 group-hover:opacity-100" : "opacity-0"} text-center p-2 text-sm`}>{kanji[property as keyof TypeKanji] && kanji[property as keyof TypeKanji].length > 0 ? kanji[property as keyof TypeKanji] : "-"}</p>
	        <input ref={inputRef} type="text" value={input} onChange={(e)=>handleSetInput(e.target.value)} className={`${settings.autoCorrection && valid ? "text-green-500" : "text-primary-600"} outline-2 focus:outline focus:outline-primary-400 dark:focus:outline-primary-700 w-full border border-primary-300 dark:border-primary-800 p-2 bg-primary-200 dark:bg-primary-900 shadow-inner rounded-lg`}/>
        </div>
      </div>
	)
}
export default MeanRead;