import { useEffect, useState } from "react";

export default function useImageQueue(BATCH_SIZE: number) {
	const [taskQueue, setTaskQueue] = useState<any[]>([]);
	const [imageQueue, setImageQueue] = useState<string[]>([]);
	const [isProcessing, setIsProcessing] = useState<boolean>(false);

	useEffect(() => {
		const processBatch = () => {
			if (isProcessing || taskQueue.length === 0) return;

			setIsProcessing(true);

			const worker = new Worker(new URL("./watermark.worker.ts", import.meta.url), {
				type: "module",
			});

			const currentBatch = taskQueue.slice(0, BATCH_SIZE);
			let completedTasks = 0;

			currentBatch.forEach((task) => {
				worker.postMessage(task);
			});

			worker.onmessage = (event) => {
				const { blob } = event.data;
				const url = URL.createObjectURL(blob);
				setImageQueue((prev) => [...prev, url]);
				completedTasks += 1;

				if (completedTasks === currentBatch.length) {
					setTaskQueue((prev) => prev.slice(BATCH_SIZE));
					setIsProcessing(false);
				}
			};

			return () => worker.terminate();
		};

		processBatch();
	}, [taskQueue, isProcessing, BATCH_SIZE]);

	return {
		taskQueue,
		setTaskQueue,
		imageQueue,
		isProcessing,
	};
}