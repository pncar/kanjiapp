// @ts-nocheck
import {useState,useEffect} from "react";
import MeanRead from "./../components/MeanRead.tsx";

const Quiz = (props) => {
	const {gameState, kanjiArray, kanjiIndex, settings, percentage, correction, onSetAllValid, onHandleValidate, onGenerateSet, onRestart} = props;
  	const [sneed,setSneed] = useState({meaning: false, onyomi: false, kunyomi: false});

	const handleSneed = (sneeds) => {
		setSneed({...sneed,[sneeds.property]:sneeds.valid});
	}

	useEffect(()=>{
		let result = false;
		const checkActive = (property) => {
		  if(sneed[property] || !settings.activeItems[property]){
		    return true;
		  }return false;
		}
		if(checkActive("meaning") && checkActive("onyomi") && checkActive("kunyomi")){
		  result = true;
		}
		onSetAllValid(result);
	},[sneed]);

	const postGame = (kanjiArray) => {
		let t = 0;
		let f = 0;
		let total = 0;
		for(let i=0;i<kanjiArray.length;i++){
			if(kanjiArray[i].correct){
				t++;
			}else{
				f++;
			}total++;
		}
		return {true: t, false: f, ratio: Math.round(t/total*100)/100};
	}

	const getRank = (n) =>{
		n = n*10;
		let title = "Wood";
		if(n >= 10){
			title = "Challenjour";
		}else if(n > 8.75){
			title = "Diamond"
		}else if(n > 7.50){
			title = "Platinum"
		}else if(n > 6.25){
			title = "Gold"
		}else if(n > 5){
			title = "Silver"
		}else if(n > 3.75){
			title = "Bronze"
		}else if(n > 2.50){
			title = "Iron"
		}
		return {title: title}
	}

	switch(gameState){
		case "prev":
			return(
	          <div className="flex items-center justify-center">
	            <div className="text-center">
	              <p>There's no challenge currently!</p>
	              <button onClick={()=>{onGenerateSet()}} className="my-2 p-2 px-3 bg-primary-300 dark:bg-primary-800 text-center rounded-lg">Generate Challenge</button>
	            </div>
	          </div>
			)
		break;
		case "finished":
		default:
			return(
	          <div className="flex items-center justify-center">
	            <div className="text-center">
	              <p>There's no challenge currently!</p>
	              {postGame(kanjiArray).true} / {postGame(kanjiArray).false} / {postGame(kanjiArray).ratio} ({getRank(postGame(kanjiArray).ratio).title})
	              <button onClick={()=>{onRestart()}} className="block m-auto my-2 p-2 px-3 bg-primary-300 dark:bg-primary-800 text-center rounded-lg">Restart</button>
	            </div>
	          </div>
			)
		break;
		case "active":
			return(
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
		                <MeanRead kanji={kanjiArray[kanjiIndex].kanji} settings={settings} property={"meaning"} onSneed={(sneed)=>{handleSneed(sneed)}} firstInOrder={true}/>
		                <MeanRead kanji={kanjiArray[kanjiIndex].kanji} settings={settings} property={"onyomi"} onSneed={(sneed)=>{handleSneed(sneed)}}/>
		                <MeanRead kanji={kanjiArray[kanjiIndex].kanji} settings={settings} property={"kunyomi"} onSneed={(sneed)=>{handleSneed(sneed)}}/>
		              </div>
		              <input type="submit" value="Validate" onClick={()=>{onHandleValidate()}} className="cursor-pointer rounded-md w-full bg-sky-500 p-2 px-3 text-primary-50 text-center"/>
		              </form>
		              <div className="h-8">
		                {percentage > 0 ? percentage : ""}
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
		break;
	}
}
export default Quiz;