import {
  Platform,
} from 'react-native'
import * as parts from './parts';
import { colors } from '../style'

export const loading = () => ({
  id: 'Initializing',
  name: 'Initializing',
  options: {
    topBar: {
      // visible: false,
      // drawBehind: true
    },
    animations: {
      push: parts.animationPush()
    }
  }
});

export const MainContact = () => ({
  id: 'Main.Contact.Component',
  name: 'Main.Contact.Component',
  options: {
    statusBar: {
      visible: true,
      style: "dark",
      backgroundColor: colors.withe
    },
    topBar: {
      visible: true,
      elevation: 0,
      noBorder: true,
      rightButtons: [
        {
          id: 'customRightBtnId',
          component: {
            name: 'Icon.Add',
            passProps: {
              originComponentId: 'Add.Topbar',
              iconSrc: require('../images/add.png'),
            },
          },
        },
      ],
    },
    animations: {
      push: parts.animationPush(),
    },
  }
});


export const actionContact = (mode,id) => ({
  id: 'Action.Contacts',
  name: 'Action.Contacts',
  passProps: {
    mode: mode,
    id:id
  },
  options: {
    modalPresentationStyle: 'overCurrentContext',
    layout: {
      backgroundColor: 'white'
    },
    topBar: {
      visible: true,
      elevation: 0,
      noBorder: true,
      leftButtons: {
        id: 'Main.Contact.Component',
        icon: require('../images/icon_back.png')
      },
    },
  }
});
export const ViewContacts = (id) => ({
  component: {
    id: 'View.Contacts',
    name: 'View.Contacts',
    passProps: {
      id: id
    },
    options: {
      statusBar: {
        visible: true,
        style: "dark",
        backgroundColor: colors.withe
      },
      topBar: {
        visible: true,
        elevation: 0,
        noBorder: true,
        background: {
          color: colors.withe
        },
        leftButtons: {
          id: 'Main.Contact.Component',
          icon: require('../images/icon_back.png')
        },
        rightButtons: [
          {
            id: 'customRightBtnIdView',
            component: {
              name: 'Icon.Edit',
              passProps: {
                originComponentId: 'Add.Topbar',
                action:'Edit',
                id:id
              },
            },
          },
        ],
      },
      animations: {
        // setRoot: parts.animationSetRoot(),
        push: parts.animationPush(),
        // pop: parts.animationPop()
      },
    }
  }
});

export const Contacts = () => ({
  id: 'Action.Contacts',
  name: 'Action.Contacts',
  options: {
    statusBar: {
      visible: true,
      style: "dark",
      backgroundColor: colors.withe
    },
    topBar: {
      visible: true,
      elevation: 0,
      noBorder: true,
    },
    animations: {
      push: parts.animationPush(),
    },
  }
});




