import { useEffect, useRef } from "react";
import cv from "@techstark/opencv-js";

export default function Page() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const imgSrc = "/img/dog1.png";

	const drawOriginalImage = () => {
		const canvas = canvasRef.current;
		if (canvas) {
			const context = canvas.getContext("2d");
			if (context && imgSrc) {
				const backImg = new Image();
				backImg.src = imgSrc;
				backImg.onload = () => {
					context.drawImage(backImg, 0, 0, context.canvas.width, context.canvas.height);
				};
			}
		}
	};

	const drawContourImage = () => {
		const canvas = canvasRef.current;
		if (canvas) {
			const context = canvas.getContext("2d");
			if (context) {
				const image = new Image();
				image.src = imgSrc;
				image.onload = () => {
					// OpenCV 작업 시작
					const src = cv.imread(canvas);
					const gray = new cv.Mat();
					const edges = new cv.Mat();

					// 그레이스케일 변환
					cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);

					// 외곽선 추출 (Canny)
					cv.Canny(gray, edges, 50, 150, 3, false);

					// 결과를 캔버스에 출력
					cv.imshow(canvas, edges);

					// 메모리 해제
					src.delete();
					gray.delete();
					edges.delete();
				};
			}
		}
	};

	useEffect(() => {
		drawOriginalImage();
	}, []);

	return (
		<>
			<h1>Contour</h1>
			<div className={"flex gap-4"}>
				<button style={{ borderColor: "lightgray" }} onClick={drawOriginalImage}>
					origin
				</button>
				<button style={{ borderColor: "lightgray" }} onClick={drawContourImage}>
					contour
				</button>
			</div>
			<canvas ref={canvasRef} width={500} height={500} />
		</>
	);
}