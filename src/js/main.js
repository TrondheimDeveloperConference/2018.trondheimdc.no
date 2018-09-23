import polyfill from 'babel-polyfill';
import fetch_polyfill from 'whatwg-fetch';

import flickrImages from "./flickr";
import registerLogoScrollListener from './logo';
import registerMenuToggler from './menu_button';
import installAnalytics from './ga';

//installAnalytics();
flickrImages(document.getElementById('flickr-images'));

registerLogoScrollListener();
registerMenuToggler();