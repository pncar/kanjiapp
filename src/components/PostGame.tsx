import {KanjiObj} from "./../ts/types.tsx";
const PostGame = (props: {onRestart: () => void, kanjiArray: KanjiObj[]}) => {
	const {onRestart, kanjiArray} = props;

	const postGameData = (kanjiArray: KanjiObj[]) => {
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
		return {true: t, false: f, total: t, ratio: Math.round(t/total*100)};
	}

	const getRank = (n: number) =>{
		n = n*10;
		let title = "Wood";
		let color = "text-yellow-800";
		if(n >= 10){
			title = "Master";
			color = "text-purple-900";
		}else if(n > 8.75){
			title = "Diamond";
			color = "text-sky-700";
		}else if(n > 7.50){
			title = "Platinum";
			color = "text-teal-600";
		}else if(n > 6.25){
			title = "Gold";
			color = "text-yellow-600";
		}else if(n > 5){
			title = "Silver";
			color = "text-slate-500";
		}else if(n > 3.75){
			title = "Bronze";
			color = "text-orange-700";
		}else if(n > 2.50){
			title = "Iron";
			color = "text-stone-600";
		}
		return {title: title, color: color}
	}

	return(
      <div className="flex items-center justify-center">
        <div className="text-center">
        	<p>Your Results</p>
          <p className={`py-4 text-2xl font-bold ${getRank(postGameData(kanjiArray).ratio).color}`}>{getRank(postGameData(kanjiArray).ratio).title}</p>
          <div className="p-3">
          	<p className="text-lg font-bold"><span className="mx-2 text-green-600">{postGameData(kanjiArray).true}</span>/<span className="mx-2 text-red-600">{postGameData(kanjiArray).false}</span></p>
          	<p>Efficiency: {postGameData(kanjiArray).ratio}%</p>
          </div>
          <button onClick={()=>{onRestart()}} className="block m-auto my-2 p-2 px-3 bg-primary-300 dark:bg-primary-800 text-center rounded-lg">Start Again</button>
        </div>
      </div>
	)
}
export default PostGame;