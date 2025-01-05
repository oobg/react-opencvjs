import { useEffect, useState } from "react";

export default function Page(): JSX.Element {
	const [imageSrc, setImageSrc] = useState<string | null>(null); // 이미지 URL 저장

	useEffect(() => {
		const worker = new Worker(new URL("./watermark.worker.ts", import.meta.url), {
			type: "module",
		});

		worker.postMessage({
			width: 500,
			height: 500,
			imgSrc: "/img/dog1.png",
			patternSrc: "/img/Flamel.webp",
			maxHeight: 20,
			gap: 20,
		});

		worker.onmessage = (event) => {
			const { blob } = event.data;

			// Blob URL 생성
			const url = URL.createObjectURL(blob);

			// 이미지 태그에 표시
			setImageSrc(url);
		};

		return () => {
			worker.terminate();
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
		<>
			<h1>Rendered Watermark Image</h1>
			{imageSrc ? (
				<img src={imageSrc} alt="Watermarked Image" />
			) : (
				<p>Loading...</p>
			)}
		</>
	);
}