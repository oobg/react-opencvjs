import { useEffect, useRef } from "react";

// 이미지 로드 유틸 함수
const loadImage = (src: string): Promise<HTMLImageElement> => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.src = src;
		img.onload = () => resolve(img);
		img.onerror = reject;
	});
};

// 메인 이미지를 캔버스에 그리기
const drawMainImage = (
	context: CanvasRenderingContext2D,
	img: HTMLImageElement,
	canvasWidth: number,
	canvasHeight: number
): void => {
	context.drawImage(img, 0, 0, canvasWidth, canvasHeight);
};

// 워터마크 패턴 생성
const createPattern = async (
	patternSrc: string,
	maxHeight: number,
	gap: number
): Promise<OffscreenCanvas> => {
	const patternImg = await loadImage(patternSrc);

	// 워터마크 이미지 비율 계산
	const aspectRatio = patternImg.width / patternImg.height;
	const patternHeight = maxHeight;
	const patternWidth = patternHeight * aspectRatio;

	// OffscreenCanvas 생성
	const offScreenCanvas = new OffscreenCanvas(patternWidth + gap, patternHeight + gap);
	const offContext = offScreenCanvas.getContext("2d");

	if (!offContext) {
		throw new Error("Failed to get 2D context for OffscreenCanvas");
	}

	// 오프스크린 캔버스 초기화 및 워터마크 그리기
	offContext.clearRect(0, 0, offScreenCanvas.width, offScreenCanvas.height);
	offContext.drawImage(patternImg, 0, 0, patternWidth, patternHeight);

	// 패턴 반환
	return offScreenCanvas;
};

// 패턴을 캔버스에 적용
const applyPattern = (
	context: CanvasRenderingContext2D,
	canvas: HTMLCanvasElement,
	patternCanvas: OffscreenCanvas
): void => {
	const pattern = context.createPattern(patternCanvas, "repeat");

	if (pattern) {
		// 캔버스 회전
		context.save();
		context.translate(canvas.width / 2, canvas.height / 2);
		context.rotate((-45 * Math.PI) / 180); // 45도 회전
		context.translate(-canvas.width / 2, -canvas.height / 2);

		// 캔버스 대각선 크기 계산
		const diagonal = Math.sqrt(canvas.width ** 2 + canvas.height ** 2);
		const extendedWidth = diagonal; // 대각선 길이
		const extendedHeight = diagonal;

		// 패턴 적용
		context.globalAlpha = 0.2; // 투명도 설정
		context.fillStyle = pattern;
		context.fillRect(
			(canvas.width - extendedWidth) / 2,
			(canvas.height - extendedHeight) / 2,
			extendedWidth,
			extendedHeight
		);

		// 상태 복원
		context.restore();
	}
};

export default function Page(): JSX.Element {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const imgSrc: string = "/img/dog1.png"; // 메인 이미지
	const patternSrc: string = "/img/Flamel.webp"; // 워터마크 이미지

	const drawImageWithCustomPattern = async (): Promise<void> => {
		const canvas = canvasRef.current;
		if (canvas) {
			const context = canvas.getContext("2d");
			if (context) {
				// 메인 이미지 로드 및 그리기
				const mainImg = await loadImage(imgSrc);
				drawMainImage(context, mainImg, canvas.width, canvas.height);

				// 워터마크 패턴 생성
				const maxHeight: number = 20; // 워터마크 높이 제한
				const gap: number = 20; // 워터마크 간 간격
				const patternCanvas = await createPattern(patternSrc, maxHeight, gap);

				// 패턴 적용
				applyPattern(context, canvas, patternCanvas);
			}
		}
	};

	useEffect(() => {
		drawImageWithCustomPattern();
	}, []);

	return (
		<>
			<h1>WaterMark</h1>
			<canvas ref={canvasRef} width={500} height={500} />
		</>
	);
}