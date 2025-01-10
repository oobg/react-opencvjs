import { useEffect, useState } from "react";

export default function Page(): JSX.Element {
	const [imageQueue, setImageQueue] = useState<string[]>([]); // 이미지 URL 저장
	const [queueIndex, setQueueIndex] = useState<number>(0); // 현재 작업 중인 이미지 인덱스

	useEffect(() => {
		// 큐 초기화: 30개의 작업 데이터 생성
		const taskQueue = Array.from({ length: 30 }, (_, i) => ({
			id: i + 1,
			width: 500,
			height: 500,
			imgSrc: `/img/dog1.png`, // 이미지 파일명은 예시로 변경
			patternSrc: `/img/Flamel.webp`,
			maxHeight: 20,
			gap: 20,
		}));

		const worker = new Worker(new URL("./watermark.worker.ts", import.meta.url), {
			type: "module",
		});

		const processQueue = (index: number) => {
			if (index >= taskQueue.length) return;

			const task = taskQueue[index];

			// 워커에 메시지 전달
			worker.postMessage(task);

			// 워커가 처리 결과를 반환했을 때
			worker.onmessage = (event) => {
				const { blob } = event.data;

				// Blob URL 생성 및 큐 업데이트
				const url = URL.createObjectURL(blob);
				setImageQueue((prev) => [...prev, url]);

				// 다음 작업 처리
				setQueueIndex((prev) => prev + 1);
			};
		};

		// 첫 작업 시작
		processQueue(queueIndex);

		// 워커 종료 및 URL 메모리 해제
		return () => {
			worker.terminate();
			imageQueue.forEach((url) => URL.revokeObjectURL(url));
		};
	}, [queueIndex]);

	return (
		<>
			<h1>Rendered Watermark Images</h1>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
				{imageQueue.length > 0 ? (
					imageQueue.map((src, index) => (
						<img key={index} src={src} alt={`Watermarked Image ${index + 1}`} />
					))
				) : (
					<p>Loading...</p>
				)}
			</div>
		</>
	);
}