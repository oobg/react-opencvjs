import { RenderImage } from "@/features/water-mark";

export default function Page(): JSX.Element {
	// 예시 프롭스
	const props = Array.from({ length: 30 }, (_, i) => ({
		id: i + 1,
		width: 500,
		height: 500,
		imgSrc: `/img/dog1.png`,
		patternSrc: `/img/Flamel.webp`,
		maxHeight: 20,
		gap: 20,
	}));

	return (
		<>
			<h1>Rendered Watermark Images Batch</h1>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
				<RenderImage props={props} />
			</div>
		</>
	);
}