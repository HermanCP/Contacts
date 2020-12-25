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

const actionContacts = (mode) => ({
    stack: {
      children: [{
        component: views.actionContact(mode)
      }]
    }
})

export {
  views,
  MainContact,
  actionContacts

}