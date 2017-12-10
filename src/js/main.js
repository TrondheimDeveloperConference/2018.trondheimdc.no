import flickrImages from "./flickr";
import registerLogoScrollListener from './logo';
import registerMenuToggler from './menu_button';

flickrImages(document.getElementById('flickr-images'));

registerLogoScrollListener();
registerMenuToggler();