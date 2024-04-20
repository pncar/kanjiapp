const Prev = (props: {onGenerateSet: () => void}) => {
	const {onGenerateSet} = props;
	return(
      <div className="flex items-center justify-center">
        <div className="text-center">
          <button onClick={onGenerateSet} className="my-2 p-2 px-6 transition-all text-primary-100 bg-sky-500 border-2 border-sky-400 hover:border-sky-300 text-center rounded-lg">Generate Challenge</button>
        </div>
      </div>
	)
}
export default Prev;