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
    },
    animations: {
      push: parts.animationPush(),
    },
  }
});

 


