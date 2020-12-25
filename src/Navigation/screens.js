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

const actionContacts = () => ({
    stack: {
      children: [{
        component: views.actionContact()
      }]
    }
})

export {
  views,
  MainContact,
  actionContacts

}