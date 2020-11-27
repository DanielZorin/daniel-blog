import './App.css';
import Header from "./components/header.component.js"
import Footer from "./components/footer.component.js"
import MapPage from "./pages/map.component.js"
import ContentsPage from "./pages/contents.component.js"
import TripPage from './pages/trip.component.js'
import { Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="contents">
        <Switch>
          <Route exact path='/' component={ContentsPage} />
          <Route exact path='/trip/:tripId' component={TripPage} />
          <Route exact path='/map' component={MapPage} />

        </Switch>
      </div>
      <Footer />
    </div>

  );
}

export default App;
