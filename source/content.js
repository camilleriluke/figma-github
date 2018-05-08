import domLoaded from 'dom-loaded';

import safeElementReady from './libs/safe-element-ready';
import { selectFigmaLinks, embedViewerAfterTag } from './embed-figma-viewer';

const embedViewers = () => selectFigmaLinks(document).map(embedViewerAfterTag);

async function init() {
	await safeElementReady('body');
	await domLoaded;

	// Let's emebed any viewers that are visible on the page at loading time
	embedViewers();

	// Now we need to listen for an event that is fired every time a pages is
	// changed via AJAX (this is highly coupled to GitHub's internal
	// implementation) and embed viewers again.
	document.addEventListener('pjax:end', () => {
		embedViewers();
	});
}

init();
