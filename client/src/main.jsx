import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import './index.css'
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}><StrictMode>
    <App />
  </StrictMode>
  </PersistGate>
  </Provider> ,
)
