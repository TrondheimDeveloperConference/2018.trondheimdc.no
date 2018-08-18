import registerLogoScrollListener from './logo';
import registerMenuToggler from './menu_button';
import installAnalytics from './ga';
import renderSpeakerList from "./sessionList";

installAnalytics();

registerLogoScrollListener();
registerMenuToggler();

renderSpeakerList(document.getElementById('programcontrainer'));