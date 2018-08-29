import registerLogoScrollListener from './logo';
import registerMenuToggler from './menu_button';
import installAnalytics from './ga';
import renderWorkshopList from './workshopList';
installAnalytics();

registerLogoScrollListener();
registerMenuToggler();

renderWorkshopList(document.getElementById('programcontrainer'));