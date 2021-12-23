import './App.css';
import AppNavigate from './AppNavigate';
import UserProvider from "./Provider/AuthProvider";
import {store} from './store/store';
import {Provider} from 'react-redux';
function App() {
  return (
    <UserProvider>
      <Provider store={store}>
        <AppNavigate/>
      </Provider>
    </UserProvider>
  );
}

export default App;
