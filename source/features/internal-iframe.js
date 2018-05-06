import { h } from 'dom-chef';

const getFrameURL = () => browser.runtime.getURL('iframe.html');

export const buildInternalFrame = (url, { allowfullscreen = false } = {}) => (
	<iframe
		style={{
			border: '0px',
			height: '500px',
			width: '100%'
		}}
		src={`${getFrameURL()}?url=${encodeURIComponent(url)}`}
		allowfullscreen={allowfullscreen}
	/>
);
