import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import {useSelector} from "react-redux";
import NavBar from './components/UI/NavBar/NavBar';
import Events from "./containers/Events/Events";
import NewEvent from './containers/NewEvent/NewEvent';
import SignIn from "./containers/SignIn/SignIn";
import SignUp from "./containers/SignUp/SignUp";
import AdminControle from "./components/AdminControle/AdminControle";
import './App.css';

const App = () => {
  const user = useSelector(state => state.users.user);

  const ProtectedRoute = ({ isAllowed, redirectTo, ...props }) => {
    return isAllowed ?
      <Route {...props} /> :
      <Redirect to={redirectTo} />
  };

  return (
    <div className="App">
      <Router>
        <NavBar />
        <ProtectedRoute
          path="/admin"
          component={AdminControle}
          isAllowed={user?.role === 'admin'}
          redirectTo="/login"
        />
        <Route exact path="/" component={Events} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/albums/new" component={NewEvent} />
        <Route path="/album/:id" component={EventInfo} />
      </Router>
    </div>
  );
}

export default App;
