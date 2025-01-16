const makeDiagonalPattern = (
	context: OffscreenCanvasRenderingContext2D,
	pattern: CanvasPattern,
	width: number,
	height: number,
): void => {
	context.translate(width / 2, height / 2);
	context.rotate((-45 * Math.PI) / 180);
	context.translate(-width / 2, -height / 2);

	const diagonal: number = Math.sqrt(width ** 2 + height ** 2);
	const extendedWidth: number = diagonal;
	const extendedHeight: number = diagonal;

	// context.globalAlpha = 0.2;
	context.globalAlpha = 0.5;
	context.fillStyle = pattern;
	context.fillRect(
		(width - extendedWidth) / 2,
		(height - extendedHeight) / 2,
		extendedWidth,
		extendedHeight
	);
}

export { makeDiagonalPattern };