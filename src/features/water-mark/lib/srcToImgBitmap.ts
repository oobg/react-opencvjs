const loadImage = async (
	src: string
): Promise<ImageBitmap> => {
	const response: Response = await fetch(src);
	if (!response.ok) {
		throw new Error(`Failed to load image: ${src}`);
	}
	const blob = await response.blob();
	return await createImageBitmap(blob);
};

export default loadImage;