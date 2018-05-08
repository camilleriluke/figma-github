import { parse } from 'query-string';
import domLoaded from 'dom-loaded';
import figmaEmbedCode from './figma-embed-code';

async function init() {
	await domLoaded;
	const { url } = parse(window.location.search);
	document.body.appendChild(figmaEmbedCode(url));
}

init();
