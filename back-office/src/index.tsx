import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import {BrowserRouter} from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, gql , HttpLink} from '@apollo/client'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const client = new ApolloClient({
  uri: 'http://192.168.1.125:4000',
  cache: new InMemoryCache(),
  headers:{
    "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZmMDMwZDE0LTI1ZmYtNDRmZi05ZTg3LThmNmQ2YTRmMmYxMyIsImlhdCI6MTY3NzczMTQyNn0.vMmRcSKwx-nxWZ9kZJcUAaTyVGqCf75m3saZjvkB4LI"
  }
})

root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
