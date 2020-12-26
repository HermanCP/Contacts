import React, { useReducer } from "react";

import { Navigation } from 'react-native-navigation'
import initializing from '../Initializing'
import MainContact from '../component/MainContact'
import IconAdd from '../component/topbar'
import IconEdit from '../component/iconEdit'
import ViewContacts from "../component/ViewContact";
import ContactAction from '../component/actionContacts'

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from "../redux/store/store";


function WrappedComponent(Component) {
  return function inject(props) {
    const EnhancedComponent = () => (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Component {...props} />
        </PersistGate>
      </Provider>

    );
    return <EnhancedComponent />;
  };
}

export function registerScreens() {
  Navigation.registerComponent('Main.Contact.Component', () =>WrappedComponent(MainContact));
  Navigation.registerComponent('Initializing', () => (initializing));
  Navigation.registerComponent('View.Contacts', () => WrappedComponent(ViewContacts));
  Navigation.registerComponent('Action.Contacts', () => WrappedComponent(ContactAction));
  Navigation.registerComponent('Icon.Add', () => IconAdd);
  Navigation.registerComponent('Icon.Edit', () => IconEdit);
  
}