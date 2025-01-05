self.onmessage = async (event) => {
	const { width, height, imgSrc, patternSrc, maxHeight, gap } = event.data;

	const offscreenCanvas = new OffscreenCanvas(width, height);
	const context = offscreenCanvas.getContext("2d");

	if (!context) {
		throw new Error("Failed to get 2D context for OffscreenCanvas.");
	}

	// 이미지 로드 함수
	const loadImage = async (src: string): Promise<ImageBitmap> => {
		const response = await fetch(src); // 이미지 URL 가져오기
		if (!response.ok) {
			throw new Error(`Failed to load image: ${src}`);
		}
		const blob = await response.blob(); // 이미지 데이터를 Blob으로 변환
		return await createImageBitmap(blob); // Blob을 ImageBitmap으로 변환
	};

	// 메인 이미지 로드 및 그리기
	const mainImg = await loadImage(imgSrc);
	context.drawImage(mainImg, 0, 0, width, height);

	// 패턴 이미지 로드 및 생성
	const patternImg = await loadImage(patternSrc);
	const aspectRatio = patternImg.width / patternImg.height;
	const patternHeight = maxHeight;
	const patternWidth = patternHeight * aspectRatio;

	const patternCanvas = new OffscreenCanvas(patternWidth + gap, patternHeight + gap);
	const patternContext = patternCanvas.getContext("2d");

	if (!patternContext) {
		throw new Error("Failed to get 2D context for pattern canvas.");
	}

	patternContext.clearRect(0, 0, patternCanvas.width, patternCanvas.height);
	patternContext.drawImage(patternImg, 0, 0, patternWidth, patternHeight);

	const pattern = context.createPattern(patternCanvas, "repeat");
	if (pattern) {
		context.save();
		context.translate(width / 2, height / 2);
		context.rotate((-45 * Math.PI) / 180);
		context.translate(-width / 2, -height / 2);

		const diagonal = Math.sqrt(width ** 2 + height ** 2);
		const extendedWidth = diagonal;
		const extendedHeight = diagonal;

		context.globalAlpha = 0.2;
		context.fillStyle = pattern;
		context.fillRect(
			(width - extendedWidth) / 2,
			(height - extendedHeight) / 2,
			extendedWidth,
			extendedHeight
		);
		context.restore();
	}

	// Blob으로 변환 후 반환
	const blob = await offscreenCanvas.convertToBlob();
	(self as DedicatedWorkerGlobalScope).postMessage({ blob });
};