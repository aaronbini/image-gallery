import template from './app-header.html';
import styles from './app-header.scss';

export default {
  template,
  transclude: true,
  controller
};

controller.$inject = ['userService', 'tokenService'];
function controller (userService, tokenService) {
  this.styles = styles;
  this.token = tokenService.get();
  this.logout = () => userService.logout();
}
