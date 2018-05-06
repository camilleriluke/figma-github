import domLoaded from 'dom-loaded';
import elementReady from 'element-ready';

/*
 * Automatically stops checking for an element to appear once the DOM is ready.
 */
export default selector => {
	const waiting = elementReady(selector);

	// Don't check ad-infinitum
	domLoaded.then(() => requestAnimationFrame(() => waiting.cancel()));

	// If cancelled, return null like a regular select() would
	return waiting.catch(() => null);
};
