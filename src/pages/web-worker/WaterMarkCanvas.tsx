import { useEffect, useRef } from "react";

export default function Page(): JSX.Element {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const imgSrc: string = "/img/dog1.png"; // 메인 이미지
	const patternSrc: string = "/img/Flamel.webp"; // 워터마크 이미지

	useEffect(() => {
		const canvas = canvasRef.current;

		if (canvas) {
			const worker = new Worker(new URL("./watermark.worker.ts", import.meta.url), {
				type: "module",
			});

			// 캔버스의 크기를 전달
			const { width, height } = canvas;

			worker.postMessage({
				width,
				height,
				imgSrc,
				patternSrc,
				maxHeight: 20, // 워터마크 높이 제한
				gap: 20, // 워터마크 간 간격
			});

			worker.onmessage = (event) => {
				const { bitmap } = event.data;

				// Web Worker에서 전달받은 ImageBitmap을 캔버스에 그리기
				const context = canvas.getContext("2d");
				if (context) {
					context.clearRect(0, 0, width, height);
					context.drawImage(bitmap, 0, 0);
				}
			};

			return () => {
				worker.terminate();
			};
		}
	}, []);

	return (
		<>
			<h1>WaterMark</h1>
			<canvas ref={canvasRef} width={500} height={500} />
		</>
	);
}