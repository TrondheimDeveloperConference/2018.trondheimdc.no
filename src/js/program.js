import registerLogoScrollListener from './logo';
import registerMenuToggler from './menu_button';
import installAnalytics from './ga';
import renderProgram from "./tableprogram";

installAnalytics();

registerLogoScrollListener();
registerMenuToggler();

renderProgram(document.getElementById('programcontrainer'));