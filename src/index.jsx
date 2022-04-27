import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
// import { store } from './redux'
// import { Provider } from 'react-redux'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider> */}
    <BrowserRouter basename="/admin-drive">
      <App />
    </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
)
