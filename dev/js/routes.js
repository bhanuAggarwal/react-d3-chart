import React from 'react';  
import { Route, IndexRoute } from 'react-router';  
import App from './components/App';

export default (  
  <Route path="/" component={App}>
    {/*<IndexRoute component={HomePage} />
    <Route path="/rooms/:id" component={Room} />*/}
  </Route>
);
