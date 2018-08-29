import registerLogoScrollListener from './logo';
import registerMenuToggler from './menu_button';
import installAnalytics from './ga';
//import renderProgram from "./tableprogram";
import renderSpeakerList from './sessionList';
installAnalytics();

registerLogoScrollListener();
registerMenuToggler();

//renderProgram(document.getElementById('programcontrainer'));
renderSpeakerList(document.getElementById('programcontrainer'));