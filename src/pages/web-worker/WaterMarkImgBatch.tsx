import { useEffect, useState } from "react";

export default function Page(): JSX.Element {
	const [imageQueue, setImageQueue] = useState<string[]>([]); // 생성된 이미지 URL 저장
	const [taskQueue, setTaskQueue] = useState<any[]>([]); // 작업 큐
	const [isProcessing, setIsProcessing] = useState<boolean>(false); // 작업 상태 플래그
	const BATCH_SIZE = 5; // 한 번에 처리할 작업 수

	useEffect(() => {
		// 초기 작업 데이터 생성 (30개의 작업을 큐에 추가)
		const initialQueue = Array.from({ length: 30 }, (_, i) => ({
			id: i + 1,
			width: 500,
			height: 500,
			imgSrc: `/img/dog1.png`, // 이미지 파일명은 예시로 변경
			patternSrc: `/img/Flamel.webp`,
			maxHeight: 20,
			gap: 20,
		}));
		setTaskQueue(initialQueue);
	}, []);

	useEffect(() => {
		const processBatch = async () => {
			if (isProcessing || taskQueue.length === 0) return; // 이미 처리 중이거나 작업이 없으면 종료

			setIsProcessing(true); // 처리 상태 활성화

			const worker = new Worker(new URL("./watermark.worker.ts", import.meta.url), {
				type: "module",
			});

			// 현재 작업 큐에서 BATCH_SIZE만큼 가져오기
			const currentBatch = taskQueue.slice(0, BATCH_SIZE);

			// 완료된 작업 카운트
			let completedTasks = 0;

			currentBatch.forEach((task) => {
				// 워커에 작업 전달
				worker.postMessage(task);
			});

			worker.onmessage = (event) => {
				const { blob } = event.data;

				// Blob URL 생성 및 큐 업데이트
				const url = URL.createObjectURL(blob);
				setImageQueue((prev) => [...prev, url]);

				// 완료된 작업 카운트 증가
				completedTasks += 1;

				// 모든 배치 작업이 완료되었으면 다음 배치 준비
				if (completedTasks === currentBatch.length) {
					setTaskQueue((prev) => prev.slice(BATCH_SIZE)); // 현재 배치 제거
					setIsProcessing(false); // 다음 배치를 처리할 수 있도록 상태 초기화
				}
			};

			// 워커 종료
			return () => worker.terminate();
		};

		processBatch();
	}, [taskQueue, isProcessing]); // 작업 큐와 처리 상태 플래그가 변경될 때 실행

	return (
		<>
			<h1>Rendered Watermark Images Batch</h1>
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