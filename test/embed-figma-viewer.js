import { JSDOM } from 'jsdom';
import test from 'ava';
import select from 'select-dom';

import {
	selectFigmaLinks,
	embedViewerAfterTag
} from '../source/embed-figma-viewer';

global.document = new JSDOM().window.document;
global.browser = {
	runtime: {
		getURL: () => ''
	}
};

const keys = [
	'DocumentFragment',
];

keys.forEach((key) => {
	global[key] = document.defaultView[key]
})

test('Selects all figma links from DOM', t => {
	const dom = new JSDOM(
		`<div class="comment">
			<div class="js-comment-body">
				<a href="https://www.figma.com/file/foo">link</a>
				<a href="https://www.figma.com/file/bar">link</a>
				<a href="http://www.figma.com/file/bar">link</a>
				<a href="#">link</a>
				<a href="www.figma.com/file/bar">link</a>
				<a href="figma.com/file/bar">link</a>
				<a href="https://figma.com/file/bar">link</a>
			</div>
		</div>`
	);

	const actual = selectFigmaLinks(dom.window.document);

	t.deepEqual(actual.map(({ href }) => href), [
		'https://www.figma.com/file/foo',
		'https://www.figma.com/file/bar'
	]);
});

test('Appends figma embed code after a given <a> tag', t => {
	const domWithATag = new JSDOM(
		`<div class=" comment-body js-comment-body">
			<a id="dom-with-a-tag-id-1" href="https://www.figma.com/files/foo">link</a>
		</div>`
	);

	const aTag = domWithATag.window.document.getElementById(
		'dom-with-a-tag-id-1'
	);
	embedViewerAfterTag(aTag);

	const actual = select.all('iframe', domWithATag.window.document);
	t.is(actual.length, 1);
});
