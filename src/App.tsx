import React from 'react';
import Template from './templates/Template';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <Template />
      </Provider>
    </div>
  );
}

export default App;
