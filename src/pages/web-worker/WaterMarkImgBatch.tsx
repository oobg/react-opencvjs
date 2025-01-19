import { useEffect, useState } from "react";
import { RenderImage, srcToImgBitmap } from "@/features/water-mark";

export default function Page(): JSX.Element {
	const [props, setProps] = useState([]);

	useEffect(() => {
		const fetchPatternBlob = async () => {
			const patternSrc = "/img/Flamel.webp";
			const patternBlob = await srcToImgBitmap(patternSrc);

			const data = Array.from({ length: 30 }, (_, i) => ({
				id: i + 1,
				width: 500,
				height: 500,
				imgSrc: `/img/dog1.png`,
				patternSrc: patternBlob,
				maxHeight: 20,
				gap: 20,
			}));

			setProps(data);
		};

		fetchPatternBlob().then();
	}, []);

	return (
		<>
			<h1>Rendered Watermark Images Batch</h1>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
				{props.length > 0 ? <RenderImage props={props} /> : <p>Loading...</p>}
			</div>
		</>
	);
}