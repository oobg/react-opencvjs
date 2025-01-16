const getPatternConfig = (
	width: number,
	height: number,
	maxHeight: number
): { patternWidth: number, patternHeight: number } => {
	const aspectRatio: number = width / height;
	const patternHeight: number = maxHeight;
	const patternWidth: number = patternHeight * aspectRatio;

	return { patternWidth, patternHeight }
}

export {
	getPatternConfig,
}