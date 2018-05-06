import domLoaded from 'dom-loaded';

import safeElementReady from './libs/safe-element-ready';
import {
	selectFigmaLinks,
	embedViewerAfterTag
} from './features/embed-figma-viewer';

async function init() {
	await safeElementReady('body');

	await domLoaded;
	selectFigmaLinks(document).map(embedViewerAfterTag);
}

init();
