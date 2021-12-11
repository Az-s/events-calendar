import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import {useSelector} from "react-redux";
import NavBar from './components/UI/NavBar/NavBar';
import Authors from './containers/authors/Authors';
import AlbumList from './containers/albumList/AlbumList';
import AlbumInfo from './containers/albumInfo/AlbumInfo';
import NewAlbum from './containers/newAlbum/NewAlbum';
import NewArtist from './containers/newArtist/NewArtist';
import NewTrack from './containers/newTrack/NewTrack';
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
        <Route exact path="/" component={Authors} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/albums" component={AlbumList} />
        <Route path="/albums/new" component={NewAlbum} />
        <Route path="/album/:id" component={AlbumInfo} />
        <Route path="/artist/new" component={NewArtist} />
        <Route path="/track/new" component={NewTrack} />
      </Router>
    </div>
  );
}

export default App;
