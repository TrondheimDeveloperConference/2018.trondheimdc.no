import polyfill from 'babel-polyfill';
import fetch_polyfill from 'whatwg-fetch';

import registerLogoScrollListener from './logo';
import registerMenuToggler from './menu_button';
//import installAnalytics from './ga';
import renderProgram from "./tableprogram";
import scrollIt from "./scrolling";
//import renderSpeakerList from './sessionList';
//installAnalytics();

registerLogoScrollListener();
registerMenuToggler();

renderProgram(document.getElementById('programcontrainer'));
scrollIt(
	document.getElementById('programcontrainer'),
	300,
	'easeOutQuad'
);
//renderSpeakerList(document.getElementById('programcontrainer'));
