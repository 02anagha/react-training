import * as React from 'react'
import { createStore } from 'redux'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider
} from "react-router-dom"
import './index.css'
import router from './routes'
import store from './store/store'
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // <React.StrictMode>
  //   {/* <BrowserRouter> */}
  //     <App />
  //   {/* </BrowserRouter> */}
  // </React.StrictMode>
)
