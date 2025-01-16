import { useEffect } from "react";
import useImageQueue from "@/features/water-mark/lib/useImageQueue.ts";

// 예시 로직
const props = Array.from({ length: 30 }, (_, i) => ({
	id: i + 1,
	width: 500,
	height: 500,
	imgSrc: `/img/dog1.png`,
	patternSrc: `/img/Flamel.webp`,
	maxHeight: 20,
	gap: 20,
}));

export default function RenderImage() {
	const BATCH_SIZE = 5;
	const { setTaskQueue, imageQueue } = useImageQueue(BATCH_SIZE);

	useEffect(() => {
		setTaskQueue(props);
	}, [setTaskQueue]);

	return (
		<>
			{imageQueue.length > 0 ? (
				imageQueue.map((src, index) => (
					<img key={index} src={src} alt={`Watermarked Image ${index + 1}`} />
				))
			) : (
				<p>Loading...</p>
			)}
		</>
	);
}