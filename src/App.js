import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import CreateGlobalStyle from './styles/global';
import List from './pages/Developers/List';
import Form from './pages/Developers/Form';

const App = () => {
  return (
    <>
      <CreateGlobalStyle />
      <ToastProvider>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={List} />
            <Route path='/new' component={Form} />
            <Route path='/edit/:id' component={Form} />
          </Switch>
        </BrowserRouter>
      </ToastProvider>
    </>
  );
}

export default App;
