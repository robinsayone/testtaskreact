import {BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
//import ViewDetails from './pages/viewDetails/ViewDetails';
import View from './pages/Events/View';
import Update from './pages/Update/Update';

const AppNavigate = () =>{

return(
	<BrowserRouter>
	 <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/viewdetails/:id"> 
           <View /> 
          </Route>
          <Route path="/update/:id"> 
           <Update /> 
          </Route>
           <Route exact path="/:value/:urlParms">
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