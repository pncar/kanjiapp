import {TypeSettings} from "./../ts/types.tsx";
import SettingItem from "./../components/SettingItem.tsx";
import Helper from "./../components/Helper.tsx";
const Settings = (props:{
	settings: TypeSettings,
	onHandleSettings: any,
	gameState: string
	}) => {
	const {settings, onHandleSettings, gameState} = props;

	/*
	const switchAll = (bool: boolean) => {
		let n = {meaning: true, onyomi: true, kunyomi: true};
		if(!bool){
			n = {meaning: false, onyomi: false, kunyomi: false};
		}
		onHandleSettings({...settings,activeItems: n});
	}
	*/

	return(
      <div className={`${settings.open ? "block" : "hidden"} flex `}>
      	<div className={`w-full text-sm pt-16 lg:pt-0`}>
      		<p className="font-bold py-5">Display Settings</p>
      		<SettingItem type="toggle" title="Serif" on={settings.serif} event={()=>{onHandleSettings({...settings,serif: !settings.serif})}}/>
      		<SettingItem type="toggle" title="Auto Check" help={"When you type a word correctly, it will highlight it."} on={settings.autoCorrection} event={()=>{onHandleSettings({...settings,autoCorrection: !settings.autoCorrection})}}/>
      		<SettingItem type="toggle" title="Hints" on={settings.showHints} event={()=>{onHandleSettings({...settings, showHints: !settings.showHints })}}/>
      		<SettingItem type="toggle" title="Dark Mode" on={settings.darkMode} event={()=>{onHandleSettings({...settings,darkMode: !settings.darkMode})}}/>
      		<hr className="dark:border-primary-800"/>
      		<div className={`transition-all ${gameState === "active" ? "opacity-50 pointer-events-none" : ""}`}>
	      		<div className="flex items-center"><p className="font-bold py-5">Listed Kanjis</p><Helper help={"Kyōiku kanji are divided by grades, here you can select which ones to include."}/></div>
	      		<div className="grid grid-cols-2 lg:grid-cols-3 items-center">
	      			{settings.groups.map((item,key)=><SettingItem key={key} type="group" group={item} event={()=>{onHandleSettings({...settings,groups: settings.groups.map((item,itemKey)=>{if(key === itemKey){item.active = !item.active;} return item;})})}}/>)}
	      		</div>
	      		<p className="font-bold py-5">Game Settings</p>
	      		<SettingItem type="number" min={1} max={50} title="Quantity" numberValue={settings.quantity} event={(q: number)=>{onHandleSettings({...settings, quantity: q})}}/>
	      		<SettingItem type="toggle" title="Meaning" on={settings.activeItems.meaning} event={()=>{onHandleSettings({...settings, activeItems: {...settings.activeItems, meaning: !settings.activeItems.meaning}})}}/>
	      		<SettingItem type="toggle" title="Onyomi" on={settings.activeItems.onyomi} event={()=>{onHandleSettings({...settings, activeItems: {...settings.activeItems, onyomi: !settings.activeItems.onyomi}})}}/>
	      		<SettingItem type="toggle" title="Kunyomi" on={settings.activeItems.kunyomi} event={()=>{onHandleSettings({...settings, activeItems: {...settings.activeItems, kunyomi: !settings.activeItems.kunyomi}})}}/>
      		</div>
      	</div>
      </div>
	)
}
export default Settings;