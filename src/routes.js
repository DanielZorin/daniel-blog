import {
  Outlet,
  createRoutesFromElements,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Header from "./components/header.component.js";
import MapPage from "./pages/map.component.js";
import ContentsPage from "./pages/contents.component.js";
import TripPage from "./pages/trip.component.js";
import YearPage from "./pages/year.component.js";
import CountryPage from "./pages/country.component.js";
import CitiesPage from "./pages/cities.component.js";
import CountryListPage from "./pages/country-list.component.js";
import PlansPage from "./pages/plans.component.js";
import ContactsPage from "./pages/contacts.component.js";
import { Route } from "react-router-dom";
import SearchPage from "./pages/search.component";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useGA4React } from "ga-4-react";

const reload = () => window.location.reload();

function Layout() {
  const location = useLocation();
  const ga = useGA4React();

  useEffect(() => {
    if (ga) {
      ga.pageview(location.pathname + location.search);
      ga.gtag("event", "pageview", location.pathname + location.search);
    }
  }, [location, ga]);

  return (
    <div className="App">
      <Header />
      <div className="contents">
        <Outlet />
      </div>
      <Helmet>
        <title>Daniel A. Zorin</title>
      </Helmet>
    </div>
  );
}

const routes = createRoutesFromElements(
  <Route element={<Layout />}>
    <Route path="/sitemap.txt" onEnter={reload} />
    <Route path="/" element={<ContentsPage/>} />
    <Route path="/trip/:tripId" element={TripPage} />
    <Route exact path="/year/:year" element={YearPage} />
    <Route exact path="/country/:countryId" element={CountryPage} />
    <Route exact path="/cities/:countryId" element={CitiesPage} />
    <Route exact path="/map" element={MapPage} />
    <Route exact path="/list" element={CountryListPage} />
    <Route exact path="/plans" element={PlansPage} />
    <Route exact path="/contacts" element={ContactsPage} />
    <Route exact path="/search/:query" element={SearchPage} />
  </Route>
);

export default routes;