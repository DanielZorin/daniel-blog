import './App.css';
import Header from "./components/header.component.js"
import Footer from "./components/footer.component.js"
import MapPage from "./pages/map.component.js"
import ContentsPage from "./pages/contents.component.js"
import TripPage from './pages/trip.component.js'
import YearPage from './pages/year.component.js'
import CountryPage from './pages/country.component.js'
import CountryListPage from './pages/country-list.component.js'
import PlansPage from './pages/plans.component.js';
import ContactsPage from './pages/contacts.component.js';
import { Switch, Route, Redirect } from 'react-router-dom';
import SearchPage from './pages/search.component';


function App() {
  const reload = () => window.location.reload();
  return (
    <div className="App">
      <Header />
      <div className="contents">
        <Switch>
          <Route path="/sitemap.txt" onEnter={reload} />
          <Route exact path='/' component={ContentsPage} />
          <Route exact path='/trip/:tripId' component={TripPage} />
          <Route exact path='/year/:year' component={YearPage} />
          <Route exact path='/country/:countryId' component={CountryPage} />
          <Route exact path='/map' component={MapPage} />
          <Route exact path='/list' component={CountryListPage} />
          <Route exact path='/plans' component={PlansPage} />
          <Route exact path='/contacts' component={ContactsPage} />
          <Route exact path='/search/:query' component={SearchPage} />
        </Switch>
      </div>
    </div>

  );
}

export default App;
