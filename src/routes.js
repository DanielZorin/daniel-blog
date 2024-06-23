import { Outlet, createRoutesFromElements } from "react-router-dom";
import "./index.css";
import Header from "./components/header.component.js";
import StatsPage from "./pages/stats.component.js";
import ContentsPage from "./pages/contents.component.js";
import TripPage from "./pages/trip.component.js";
import YearPage from "./pages/year.component.js";
import CountryPage from "./pages/country.component.js";
import CitiesPage from "./pages/cities.component.js";
import CountryListPage from "./pages/country-list.component.js";
import { Route } from "react-router-dom";
import SearchPage from "./pages/search.component";
import { Helmet } from "react-helmet";
import Contacts from "./pages/contacts.component.js";
import Plans from "./pages/plans.component.js";
import { SearchBox } from "./components/search-box.js";
import StartPage from "./pages/start.component.js";
import FeedPage from "./pages/feed.component.js";
import GuidesPage from "./pages/guides.component.js";
import { useEffect, useState } from "react";

const reload = () => window.location.reload();

function Layout() {
  const [isMobile, setIsMobile] = useState(false);

  // Function to check if the viewport width is less than 768px (typical mobile breakpoint)
  const checkIsMobile = () => {
    const viewportWidth = window.innerWidth;
    if (viewportWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="flex flex-col md:flex-row w-full">
        <div className="md:w-4/5 flex flex-col pl-6 pr-6 pt-6">
          <Outlet />
        </div>
        {isMobile ? (
          // Display below main content on mobile
          <div className="md:hidden flex flex-col items-start w-full border-t-[2px] min-h-screen mt-4">
            <div className="border-b-[2px] w-full p-4">
              <SearchBox />
            </div>
            <div className="border-b-[2px] w-full p-4">
              <Contacts />
            </div>
            <div className="border-b-[2px] w-full p-4">
              <Plans />
            </div>
          </div>
        ) : (
          // Display on the right for larger screens
          <div className="hidden md:flex flex-col items-start w-1/5 border-l-[2px] min-h-screen mt-4">
            <div className="border-b-[2px] w-full p-4">
              <SearchBox />
            </div>
            <div className="border-b-[2px] w-full p-4">
              <Contacts />
            </div>
            <div className="border-b-[2px] w-full p-4">
              <Plans />
            </div>
          </div>
        )}
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
    <Route path="/" element={<StartPage />} />
    <Route path="/:lang" element={<FeedPage />} />
    <Route path="/:lang/history" element={<ContentsPage />} />
    <Route path="/:lang/trip/:tripId" element={<TripPage />} />
    <Route path="/:lang/post/:tripId" element={<TripPage />} />
    <Route exact path="/:lang/year/:year" element={<YearPage />} />
    <Route exact path="/:lang/country/:countryId" element={<CountryPage/>} />
    <Route exact path="/:lang/cities/:countryId" element={<CitiesPage/>} />
    <Route exact path="/:lang/stats" element={<StatsPage />} />
    <Route exact path="/:lang/guides" element={<GuidesPage />} />
    <Route exact path="/:lang/list" element={<CountryListPage />} />
    <Route exact path="/:lang/search/:query" element={<SearchPage/>} />
  </Route>
);

export default routes;
