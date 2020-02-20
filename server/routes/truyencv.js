const express = require('express');

const {
	fetchHtmlFromUrl,
	sendResponse,
	composeAsync,
	fetchElemInnerText,
	fetchElemAttribute
} = require('../utils/utils');

const baseUrl = 'https://truyencv.com';

const router = express.Router();

router.get('/:title/:chapter', (req, res) => {
	const { title, chapter } = req.params;
	sendResponse(res)(
		composeAsync(
			extractTruyenCVContent,
			fetchHtmlFromUrl
		)(`${baseUrl}/${title}/${chapter}/`)
	);
});

router.get('/:title', (req, res) => {
	const { title } = req.params;
	sendResponse(res)(
		composeAsync(
			extractTruyenCVPoster,
			fetchHtmlFromUrl
		)(`${baseUrl}/${title}/`)
	);
});

/**
 * Extractor Function
 */

const extractTruyenCVPoster = $ => {
	const mainPosterTag = $('main.truyencv-main').find(
		'div.truyencv-detail-info-block'
	);

	const thumbPosterTag = mainPosterTag.find('div.col-thumb').find('img');
	const thumbPoster = fetchElemAttribute('src')(thumbPosterTag);

	const infoTag = mainPosterTag.find('div.info');
	const title = fetchElemInnerText(infoTag.find('h1.title'));

	const items = infoTag.find('div.item');
	const [author, category, status, latest] = [
		...Array(items.length)
	].map((value, id) => fetchElemInnerText(items.eq(id).find('div.item-value')));

	return {
		thumbPoster,
		title,
		author,
		category,
		status,
		latest
	};
};

const extractTruyenCVContent = $ => {
	const contentTag = $('div.content');
	const chapterTag = $('div.truyencv-read-content')
		.find('div.header')
		.find('h2.title');

	const chapter = fetchElemInnerText(chapterTag);
	const content = fetchElemInnerText(contentTag);

	const noise = [
		contentTag.find('p').text(),
		contentTag.find('div.alert').text()
	].join('');

	const cleanedContent = cleanContent(
		`${chapter}. ${content.slice(
			0,
			content.length - noise.length - 1
		)}. HẾT CHƯƠNG.`
	);

	const navButtonTag = $('div.truyencv-read-navigation');
	const navButtons = navButtonTag.find('a.btn-truyencv');

	const previous =
		fetchElemAttribute('title')(navButtons.eq(0)) === 'Chương trước'
			? fetchElemAttribute('href')(navButtons.eq(0))
			: '';
	const next =
		fetchElemAttribute('title')(navButtons.eq(-1)) === 'Chương sau'
			? fetchElemAttribute('href')(navButtons.eq(-1))
			: '';

	return {
		chapter,
		cleanedContent,
		previous,
		next
	};
};

/**
 * Cleaning the content by replace all separator
 * @param {*} content
 */

const cleanContent = content => {
	const sep = /\. \. \.|\.\.\.|\.\.|!/;
	const special = /"|:|'|\?/;

	return content
		.split(sep)
		.join('. ')
		.split(special)
		.join(' ');
};

module.exports = router;
