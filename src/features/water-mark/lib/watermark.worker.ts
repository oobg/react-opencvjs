import type { IMessageEventData } from "../model";
import srcToImgBitmap from "./srcToImgBitmap";
import { getPatternConfig, makeDiagonalPattern } from "@/features/water-mark/lib/pattern";

self.onmessage = async (event: MessageEvent<IMessageEventData>): Promise<void> => {
	const { width, height, imgSrc, patternSrc, maxHeight, gap } = event.data;

	const offscreenCanvas: OffscreenCanvas = new OffscreenCanvas(width, height);
	const context: OffscreenCanvasRenderingContext2D | null = offscreenCanvas.getContext("2d");

	if (!context) {
		throw new Error("Failed to get 2D context for OffscreenCanvas.");
	}

	// 메인 이미지 로드 및 그리기
	const mainImg: ImageBitmap = await srcToImgBitmap(imgSrc);
	context.drawImage(mainImg, 0, 0, width, height);

	// 패턴 이미지 로드 및 생성
	const patternImg: ImageBitmap = patternSrc;
	const { patternWidth, patternHeight } = getPatternConfig(patternImg.width, patternImg.height, maxHeight);

	const patternCanvas: OffscreenCanvas = new OffscreenCanvas(patternWidth + gap, patternHeight + gap);
	const patternContext: OffscreenCanvasRenderingContext2D | null = patternCanvas.getContext("2d");

	if (!patternContext) {
		throw new Error("Failed to get 2D context for pattern canvas.");
	}

	patternContext.clearRect(0, 0, patternCanvas.width, patternCanvas.height);
	patternContext.drawImage(patternImg, 0, 0, patternWidth, patternHeight);

	const pattern: CanvasPattern | null = context.createPattern(patternCanvas, "repeat");

	// 패턴 그리기
	if (pattern) {
		context.save();
		makeDiagonalPattern(context, pattern, width, height);
		context.restore();
	}

	// Blob으로 변환 후 반환
	sendToClient(offscreenCanvas, self as DedicatedWorkerGlobalScope);
};

const sendToClient = (
		offscreenCanvas: OffscreenCanvas,
		_self: DedicatedWorkerGlobalScope
	): void => {
	offscreenCanvas.convertToBlob().then((blob: Blob) => _self.postMessage({ blob }))
}