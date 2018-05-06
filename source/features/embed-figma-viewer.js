import select from 'select-dom';
import { figmaEmbedURL } from './figma-embed-code';
import { buildInternalFrame } from './internal-iframe';

export const selectFigmaLinks = parent => {
	return select.all(
		'.comment .js-comment-body a[href^="https://www.figma.com/file"]',
		parent
	);
};

export const embedViewerAfterTag = aTag => {
	[aTag]
		.map(aTag => [aTag, figmaEmbedURL(aTag.href)])
		.map(([aTag, figmaUrl]) => [
			aTag,
			buildInternalFrame(figmaUrl, { allowfullscreen: true })
		])
		.map(([aTag, internalIframe]) => aTag.after(internalIframe));
};
