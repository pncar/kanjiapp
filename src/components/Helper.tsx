const Helper: React.FC<{help: string}>= ({help}) => {
	return(
		<span className="inline-block relative w-auto group px-1 font-normal cursor-pointer">
			<i className="bi bi-info-circle"/>
			<span className="hidden group-hover:block z-10 min-w-[300px] absolute rounded-lg border border-primary-300 bg-primary-50 shadow-lg p-3">
				{help}
			</span>
		</span>
	)
}
export default Helper;