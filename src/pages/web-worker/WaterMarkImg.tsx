import { useEffect, useState } from "react";

export default function NewPage(): JSX.Element {
	const [imageSrc, setImageSrc] = useState<string | null>(null); // 이미지 URL 저장

	useEffect(() => {
		const worker = new Worker(new URL("./watermark.worker.ts", import.meta.url), {
			type: "module",
		});

		// Web Worker로 데이터 전달
		worker.postMessage({
			width: 500,
			height: 500,
			imgSrc: "/img/dog1.png",
			patternSrc: "/img/Flamel.webp",
			maxHeight: 20,
			gap: 10,
		});

		// Web Worker에서 결과 수신
		worker.onmessage = (event) => {
			const { bitmap } = event.data;

			// ImageBitmap -> Blob -> Object URL
			const canvas = document.createElement("canvas");
			canvas.width = 500;
			canvas.height = 500;
			const context = canvas.getContext("2d");
			if (context) {
				context.drawImage(bitmap, 0, 0);
				canvas.toBlob((blob) => {
					if (blob) {
						const url = URL.createObjectURL(blob);
						setImageSrc(url); // URL을 상태로 저장
					}
				});
			}
		};

		return () => {
			worker.terminate(); // 컴포넌트 언마운트 시 워커 종료
		};
	}, []);

	useEffect(() => {
		return () => {
			if (imageSrc) {
				URL.revokeObjectURL(imageSrc);
			}
		};
	}, [imageSrc]);

	return (
		<div>
			<h1>Rendered Watermark Image</h1>
			{imageSrc ? (
				<img src={imageSrc} alt="Watermarked Image" />
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
}