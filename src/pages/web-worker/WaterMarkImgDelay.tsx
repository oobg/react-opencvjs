import { useEffect, useState } from "react";

export default function Page(): JSX.Element {
	const [imageSrc, setImageSrc] = useState<string | null>(null); // 이미지 URL 저장
	let postStartTime = 0; // postMessage 호출 시점 기록
	const debounceTime = 400; // 디바운스 시간

	useEffect(() => {
		const worker = new Worker(new URL("./watermark.worker.ts", import.meta.url), {
			type: "module",
		});

		// Web Worker로 데이터 전달
		postStartTime = Date.now();
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

			// 현재 시간과 postMessage 시점 차이 계산
			const elapsedTime = Date.now() - postStartTime;

			if (elapsedTime >= debounceTime) {
				// Blob URL 생성
				const url = URL.createObjectURL(blob);
				setImageSrc(url);
			} else {
				// 200ms가 안 됐을 경우 남은 시간만큼 딜레이 후 업데이트
				const delay = debounceTime - elapsedTime;
				const timeoutId = setTimeout(() => {
					const url = URL.createObjectURL(blob);
					setImageSrc(url);
				}, delay);

				// Cleanup
				return () => clearTimeout(timeoutId);
			}
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