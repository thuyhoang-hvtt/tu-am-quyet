import React from 'react';
import API from './API';
import { generateError } from '../actions/ajax';
import { addContent, addInfo, openPlayer } from '../actions/player';

async function useNavigate(url: string, exact: boolean = true): [Function] {
	let title;
	let chapter;
	const response = [];

	const [host, route] = url
		.split(/http:\/\/|https:\/\/|.com\//)
		.filter(value => value !== '');

	switch (host) {
		case 'truyencv':
			[title, chapter = 'chuong-1'] = route
				.split('/')
				.filter(value => value !== '');
			try {
				response.push(
					addContent(
						await await (await API.get([host, title, chapter].join('/'))).data
							.data
					),
					openPlayer(true)
				);
				if (!exact)
					response.unshift(
						addInfo(await (await API.get([host, title].join('/'))).data.data)
					);
			} catch (e) {
				return [generateError(e.message)];
			}
			return response;
		default:
			return [generateError('Invalid URL')];
	}
}

export default useNavigate;
