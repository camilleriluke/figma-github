import { h } from 'dom-chef';

export const figmaEmbedURL = figmaFileURL =>
	`https://www.figma.com/embed?embed_host=share&url=${figmaFileURL}`;

export default (figmaFileURL, { width = '650', height = '450' } = {}) => (
	<iframe
		style={{
			border: 'none'
		}}
		width={width}
		height={height}
		src={figmaEmbedURL(figmaFileURL)}
		allowfullscreen
	/>
);
