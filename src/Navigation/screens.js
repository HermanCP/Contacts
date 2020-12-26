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

const actionContacts = (mode,id) => ({
    stack: {
      children: [{
        component: views.actionContact(mode,id)
      }]
    }
})

export {
  views,
  MainContact,
  actionContacts

}