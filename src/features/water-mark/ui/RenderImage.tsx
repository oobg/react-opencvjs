import { useEffect } from "react";
import useImageQueue from "@/features/water-mark/lib/useImageQueue.ts";

interface RenderImageProps {
	id: number;
	width: number;
	height: number;
	imgSrc: string;
	patternSrc: string;
	maxHeight: number;
	gap: number;
}

interface RenderImageComponentProps {
	props: RenderImageProps[];
}

export default function RenderImage({ props }: RenderImageComponentProps): JSX.Element {
	const BATCH_SIZE = 10;
	const { setTaskQueue, imageQueue } = useImageQueue(BATCH_SIZE);

	useEffect(() => {
		setTaskQueue(props);
	}, [setTaskQueue, props]);

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