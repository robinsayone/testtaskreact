import {BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login/Login';
import Home from './pages/Home/Home';

const AppNavigate = () =>{

return(
	<BrowserRouter>
	 <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
        </Switch>
    </BrowserRouter>
	);
}
export default AppNavigate;