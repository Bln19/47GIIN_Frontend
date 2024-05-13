import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

library.add(fas, faUser, faLock);

export default {
  install: (app) => {
    app.component('font-awesome-icon', FontAwesomeIcon);
  }
};
