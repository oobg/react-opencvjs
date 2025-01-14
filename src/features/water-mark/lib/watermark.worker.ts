import type { IMessageEventData } from "../model";

self.onmessage = async (event: MessageEvent<IMessageEventData>): Promise<void> => {
	const { width, height, imgSrc, patternSrc, maxHeight, gap } = event.data;

	const offscreenCanvas: OffscreenCanvas = new OffscreenCanvas(width, height);
	const context: OffscreenCanvasRenderingContext2D | null = offscreenCanvas.getContext("2d");

	if (!context) {
		throw new Error("Failed to get 2D context for OffscreenCanvas.");
	}

	// 메인 이미지 로드 및 그리기
	const mainImg: ImageBitmap = await loadImage(imgSrc);
	context.drawImage(mainImg, 0, 0, width, height);

	// 패턴 이미지 로드 및 생성
	const patternImg: ImageBitmap = await loadImage(patternSrc);
	const { patternWidth, patternHeight } = patternConfig(patternImg.width, patternImg.height, maxHeight);

	const patternCanvas: OffscreenCanvas = new OffscreenCanvas(patternWidth + gap, patternHeight + gap);
	const patternContext: OffscreenCanvasRenderingContext2D | null = patternCanvas.getContext("2d");

	if (!patternContext) {
		throw new Error("Failed to get 2D context for pattern canvas.");
	}

	patternContext.clearRect(0, 0, patternCanvas.width, patternCanvas.height);
	patternContext.drawImage(patternImg, 0, 0, patternWidth, patternHeight);

	const pattern: CanvasPattern | null = context.createPattern(patternCanvas, "repeat");

	if (pattern) {
		context.save();
		makePattern(context, pattern, width, height);
		context.restore();
	}

	// Blob으로 변환 후 반환
	sendToClient(offscreenCanvas, self as DedicatedWorkerGlobalScope);
};

const loadImage = async (
		src: string
	): Promise<ImageBitmap> => {
	const response: Response = await fetch(src);
	if (!response.ok) {
		throw new Error(`Failed to load image: ${src}`);
	}
	const blob = await response.blob();
	return await createImageBitmap(blob);
};

const patternConfig = (
		width: number,
		height: number,
		maxHeight: number
	): { patternWidth: number, patternHeight: number } => {
	const aspectRatio: number = width / height;
	const patternHeight: number = maxHeight;
	const patternWidth: number = patternHeight * aspectRatio;

	return { patternWidth, patternHeight }
}

const makePattern = (
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

const sendToClient = (
		offscreenCanvas: OffscreenCanvas,
		_self: DedicatedWorkerGlobalScope
	): void => {
	offscreenCanvas.convertToBlob().then((blob: Blob) => _self.postMessage({ blob }))
}