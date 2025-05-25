import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AppNavigator } from './navigations/AppNavigator';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App; 