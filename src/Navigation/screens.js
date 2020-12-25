import * as views from './views';

const MainContact = () =>({
  root: {
    stack: {
      children: [{
        component: views.MainContact()
      }]
    }
  },
})

export {
  MainContact
}