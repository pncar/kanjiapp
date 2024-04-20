import {TypeSettings,TypeKanji,KanjiObj} from "./ts/types.tsx";
import { useState, useEffect} from 'react';
import { grade1, grade2, grade3, grade4, grade5, grade6 } from "./content/kanjilists.tsx";
import Settings from "./components/Settings.tsx";
//import Quiz from "./components/Quiz.tsx";
import Game from "./components/Game.tsx";
import Prev from "./components/Prev.tsx";
import PostGame from "./components/PostGame.tsx";
import Alert from "./components/Alert.tsx";
import "./App.css";

function App() {

  const [kanjis,setKanjis] = useState<TypeKanji[]>([...grade1]);
  const [correction,setCorrection] = useState<string>("");
  const [settings,setSettings] = useState<TypeSettings|null>(null);

  const [kanjiArray,setKanjiArray] = useState<KanjiObj[]>();
  const [kanjiIndex,setKanjiIndex] = useState<number>(0);
  const [allValid,setAllValid] = useState<boolean>(false);
  const [gameState,setGameState] = useState<string>("prev");
  const [alertMsg,setAlertMsg] = useState<string|null>(null);


  const defaultSettings: TypeSettings = {
        open: true,
        darkMode: false,
        serif: true,
        activeItems: {meaning: true, onyomi: false, kunyomi: false},
        showHints: false,
        quantity: 10,
        autoCorrection: true,
        groups: [
            {title: "Grade 1", content: grade1, active: true},
            {title: "Grade 2", content: grade2, active: false},
            {title: "Grade 3", content: grade3, active: false},
            {title: "Grade 4", content: grade4, active: false},
            {title: "Grade 5", content: grade5, active: false},
            {title: "Grade 6", content: grade6, active: false}
        ]
  }

  const handleSettings = (data: TypeSettings) => {
    setSettings(data);
  }


  const handleNext = () => {
    if(settings){
      if(kanjiIndex < settings.quantity -1){
        setKanjiIndex(kanjiIndex+1);
      }else{
        setGameState("finished");
      }
      return true;
    }else{
      console.error("Settings not initialized.");
      return false;
    }
  }

  const restart = () => {
    setGameState("prev");
    setAllValid(false);
    setKanjiIndex(0);
  }

  const restoreDefault = () => {
    setSettings(defaultSettings);
    setAlertMsg("Settings have been restored to default.");
  }

  const handleValidate = () => { //Make this cleaner
    let result: boolean = false;
    if(allValid){
      result = true;
      handleNext();
    }else{
      handleCorrection();
      handleNext();
    }
    let temp:KanjiObj[]  = [...kanjiArray];
    temp[kanjiIndex].correct = result;
    temp[kanjiIndex].submitted = true;
    setKanjiArray(temp);
  }

  const handleCorrection = () => {
    let s: string = "It was: ";
    if(settings && kanjiArray){
      if(settings.activeItems.meaning){
        s += `${kanjiArray[kanjiIndex].kanji.meaning}, `;
      }
      if(settings.activeItems.onyomi){
        s += `${kanjiArray[kanjiIndex].kanji.onyomi}, `;
      }
      if(settings.activeItems.kunyomi){
        s += `${kanjiArray[kanjiIndex].kanji.kunyomi}`;
      }
      setCorrection(`${s}`);
        setTimeout(()=>{
          setCorrection("");
        },2000);
    }else{
      console.error("Some states are not initialized")
    }
  }

  const generateSet = (/* options:Object = null*/) => {
    let r: KanjiObj[] = []; 
    if(kanjis.length <= 0){
      setAlertMsg("You must at least pick one set of kanjis in order to start a challenge.");
    }else if(settings && !settings.activeItems.meaning && !settings.activeItems.onyomi && !settings.activeItems.kunyomi){
      setAlertMsg("You must at least pick one type of reading (or meaning) in order to start a challenge.");
    }else{
      for(let i=0;i<settings.quantity;i++){
        r.push({
          kanji: kanjis[Math.floor(Math.random() * kanjis.length)],
          correct: false,
          submitted: false
        });
      }
      setKanjiArray(r);
      setGameState("active");
      //On small screens close the settings
      if(window.innerWidth < 640){         
        setSettings({...settings,open:false});
      }
    }
  }


  useEffect(()=>{
    let r: TypeKanji[] = [];
    if(settings){
      for(let i=0;i<settings.groups.length;i++){
        if(settings.groups[i].active){
          r = [...r,...settings.groups[i].content];
        }
      }
      setKanjis(r);
    }
  },[settings]);

  useEffect(()=>{
    if (settings !== null) {
      localStorage.setItem('kanjiSettings', JSON.stringify(settings));
    }
  },[settings]);

  useEffect(()=>{
    const savedData: string = localStorage.getItem('kanjiSettings');
    if(savedData){
      setSettings(JSON.parse(savedData));
    }else{
      setSettings(defaultSettings);
    }
  },[]);

 
  return (
      <div className={`transition-all duration-1000 ${settings && settings.darkMode ? "dark" : ""}`}>
        {alertMsg ? <Alert msg={alertMsg} onClose={()=>{setAlertMsg(null)}}/> : ""}
        {settings ? 
        <div className={`bg-primary-300 dark:bg-primary-950 bg-gradient-to-t from-primary-100 dark:from-primary-800 to-primary-300 dark:to-primary-950 text-primary-600 dark:text-primary-400 w-full min-h-screen flex items-center justify-center flex-wrap lg:flex-nowrap`}>
          <div onClick={()=>{setSettings({...settings,open:!settings.open})}} className="absolute bg-primary-50 dark:bg-primary-900 lg:bg-transparent lg:dark:bg-transparent border-r lg:border-none border-primary-300 dark:border-primary-800 shadow-lg lg:shadow-none top-0 left-0 w-full lg:w-auto h-auto lg:h-screen p-3 px-5 z-20 cursor-pointer">
            <i className="text-2xl inline-block bi bi-gear transition-all roate-0 hover:rotate-12"/>
          </div>
          <div className={`absolute top-0 left-0 bg-primary-50 dark:bg-primary-800 transition-all shadow-lg overflow-x-hidden overflow-y-auto ${!settings.open ? "w-full lg:w-0 h-0 lg:h-screen" : "h-screen w-full lg:w-1/4" } z-10 border-r border-primary-300 dark:border-primary-800`}>
            {settings.open ? 
            <div className="px-8 lg:px-16">
              <Settings gameState={gameState} settings={settings} onHandleSettings={(data: TypeSettings)=>{handleSettings(data)}}/>
              <div className="flex w-full text-sm">
                <div className="w-full pr-3">
                  <button onClick={()=>{generateSet()}} disabled={gameState === "active" ? true : false} className={`w-full my-2 p-2 px-3 text-primary-100 transition-all bg-sky-500 border-2 border-sky-400 hover:border-sky-300 text-center rounded-lg transition-all ${gameState === "active" ? "opacity-50" : "opacity-100"}`}>Generate Challenge</button>
                </div>
                <div className="w-full pr-3">
                  <button onClick={restoreDefault} disabled={gameState === "active" ? true : false} className={`w-full my-2 p-2 px-3 border-2 border-primary-200 dark:border-primary-700 bg-primary-300 dark:bg-primary-900 text-center rounded-lg transition-all ${gameState === "active" ? "opacity-50" : "opacity-100"}`}>Restore Default</button>
                </div>
              </div>
            </div>:<></>}
          </div>
          <div className="w-full flex items-center justify-center px-8">
            <div className="w-full lg:w-2/4 bg-primary-50 dark:bg-primary-900 rounded-lg shadow-lg p-8 flex items-center justify-center">
              <div className="">
                {gameState === "prev" ? 
                  <Prev 
                    onGenerateSet={generateSet}
                  /> : <></>
                }
                {gameState === "active" ? 
                  <Game 
                    kanjiArray={kanjiArray} 
                    kanjiIndex={kanjiIndex} 
                    settings={settings} 
                    correction={correction} 
                    onSetAllValid={(d: boolean)=>{setAllValid(d)}} 
                    onHandleValidate={handleValidate}
                    onRestart={restart}
                  /> : <></>
                }
                {gameState === "finished" ? 
                  <PostGame 
                    kanjiArray={kanjiArray}
                    onRestart={restart}
                  /> : <></>
                }
              </div>
            </div>
          </div>
        </div>:<></>
        }
      </div>
  )
}

export default App
