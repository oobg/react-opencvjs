import { useEffect, useRef } from "react";

export default function Page() {

	const canvasRef = useRef<HTMLCanvasElement>(null);

	const imgSrc = "/img/dog1.png";

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			const context = canvas.getContext("2d");
			if (context) {
				if (imgSrc) {
					const backImg = new Image();
					backImg.src = imgSrc;
					backImg.onload = () => {
						context.drawImage(backImg, 0, 0, context.canvas.width, context.canvas.height);
					}
				} else {
					context.fillStyle = "white";
					context.fillRect(0, 0, context.canvas.width, context.canvas.height);
				}
			}
		}
	}, []);

	const convertToOriginal = () => {
		const canvas: HTMLCanvasElement = canvasRef.current as HTMLCanvasElement;
		if (canvas) {
			const context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
			if (context) {
				if (imgSrc) {
					const backImg = new Image();
					backImg.src = imgSrc;
					backImg.onload = () => {
						context.drawImage(backImg, 0, 0, context.canvas.width, context.canvas.height);
					}
				} else {
					context.fillStyle = "white";
					context.fillRect(0, 0, context.canvas.width, context.canvas.height);
				}
			}
		}
	}

	const convertToGrey = () => {
		const canvas: HTMLCanvasElement = canvasRef.current as HTMLCanvasElement;
		if (canvas) {
			const context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
			if (context) {
				const imageData: ImageData = context.getImageData(0, 0, canvas.width, canvas.height);
				const data: Uint8ClampedArray = imageData.data;
				for (let i: number = 0; i < data.length; i += 4) {
					const grey: number = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
					data[i] = grey;
					data[i + 1] = grey;
					data[i + 2] = grey;
				}
				context.putImageData(imageData, 0, 0);
			}
		}
	}

	return (
		<>
			<div
				style={{ display: "flex", gap: "1rem", }}
			>
				<button
					style={{ borderColor: "lightgray" }}
					onClick={convertToOriginal}
				>origin
				</button>
				<button
					style={{ borderColor: "lightgray" }}
					onClick={convertToGrey}
				>grey
				</button>
			</div>
			<canvas
				ref={canvasRef}
				width={500}
				height={500}
			/>
		</>
	)
}
