
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'


library.add(faUserSecret, faGithub)

export default {
  install: (app) => {
    app.component('font-awesome-icon', FontAwesomeIcon)
  }
}

