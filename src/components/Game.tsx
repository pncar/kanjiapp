import {TypeSettings,KanjiObj} from "./../ts/types.tsx";
import {useState, useEffect} from "react";
import MeanRead from "./../components/MeanRead.tsx";

const Game = (props: {
		kanjiArray: KanjiObj[],
		kanjiIndex: number,
		settings: TypeSettings,
		correction: string,
		onSetAllValid: any,
		onHandleValidate: () => void,
		onRestart: () => void
}) => {
	const {kanjiArray, kanjiIndex, settings, correction, onSetAllValid, onHandleValidate, onRestart} = props;
	const [readings,setReadings] = useState<{meaning: boolean, onyomi: boolean, kunyomi: boolean}>({meaning: false, onyomi: false, kunyomi: false});

	const handleReadings = (e: {property: string, valid: boolean}) => {
		setReadings({...readings,[e.property]:e.valid});
	}

	useEffect(()=>{
		let result: boolean = false;
		const checkActive = (property: keyof typeof readings) => {
		  if(readings[property] || !settings.activeItems[property]){
		    return true;
		  }
		  return false;
		}
		if(checkActive("meaning") && checkActive("onyomi") && checkActive("kunyomi")){
		  result = true;
		}
		onSetAllValid(result);
	},[readings]);



	return (
          <div className="w-full">
              <div className="flex items-center justify-center">
                <div>
                  {kanjiIndex +1 }/{settings.quantity}
                </div>
              </div>
              <div className="p-8 flex items-center justify-center">
                <h1 className={`text-8xl text-primary-900 dark:text-primary-100 ${settings.serif ? "font-kanjiSerif" : "font-kanjiSans"} font-bold`}>{kanjiArray[kanjiIndex].kanji.symbol}</h1>
              </div>
              <form onSubmit={(e)=>{e.preventDefault()}}>
              <div className="flex w-full cursor-default">
                <MeanRead kanji={kanjiArray[kanjiIndex].kanji} settings={settings} property={"meaning"} onHandleReadings={(e: {property: string, valid: boolean})=>{handleReadings(e)}} firstInOrder={true}/>
                <MeanRead kanji={kanjiArray[kanjiIndex].kanji} settings={settings} property={"onyomi"} onHandleReadings={(e: {property: string, valid: boolean})=>{handleReadings(e)}} firstInOrder={!settings.activeItems.meaning ? true : false}/>
                <MeanRead kanji={kanjiArray[kanjiIndex].kanji} settings={settings} property={"kunyomi"} onHandleReadings={(e: {property: string, valid: boolean})=>{handleReadings(e)}}  firstInOrder={!settings.activeItems.meaning && !settings.activeItems.onyomi ? true : false}/>
              </div>
              <input type="submit" value="Validate" onClick={onHandleValidate} className="cursor-pointer rounded-md w-full bg-sky-500 p-2 px-3 text-primary-50 text-center"/>
              </form>
              <div className="h-8">
              </div>
              <div className="w-full min-h-10 flex items-center grid grid-cols-10">
                {kanjiArray.map((item,key)=>
                  <div key={key} className="w-full flex items-center justify-center">{item.submitted ? <div className={`w-2 h-2 inline-block rounded-full ${item.correct ? "bg-green-500" : "bg-red-500"}`}></div> : <div className={`w-2 h-2 inline-block rounded-full border-2 border-gray-500`}></div>}</div>
                )}
              </div>
              <div className="h-8">
                {correction}
              </div>
              <div>
          		<button onClick={()=>{onRestart()}} className="my-2 p-2 px-3 bg-primary-300 dark:bg-primary-800 text-center rounded-lg">Restart</button>
              </div>
          </div>
	)
}
export default Game;