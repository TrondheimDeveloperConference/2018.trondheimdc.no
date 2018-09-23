import flickrImages from "./flickr";
import registerLogoScrollListener from './logo';
import registerMenuToggler from './menu_button';
import installAnalytics from './ga';

//installAnalytics();
flickrImages(document.getElementById('flickr-images'));

registerLogoScrollListener();
registerMenuToggler();