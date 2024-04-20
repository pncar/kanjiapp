import ClickOutsideDetector from "./../components/ClickOutsideDetector.tsx";
const Alert = (props: {msg: string, onClose: () => void}) => {
	const {msg,onClose} = props;
	return(
		<div className="w-full h-screen z-30 absolute bg-primary-900 bg-opacity-50 flex items-center justify-center">
			<ClickOutsideDetector onClickOutside={onClose}>
				<div className="m-3 p-8 bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-300 text-center shadow-lg rounded-lg">
					<div className="p-4">{msg}</div>
					<button onClick={onClose} className="p-2 px-4 bg-sky-500 text-primary-100 rounded-lg">Close</button>
				</div>
			</ClickOutsideDetector>
		</div>
	)
}
export default Alert;