import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import GymnastDetails from './pages/GymnastDetails';
import Roster from './pages/Roster';
import NewGymnast from './pages/NewGymnast';
import UpdateGymnast from "./pages/UpdateGymnast";
import Login from './pages/Login';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import ShowBar from "./components/ShowBar";
import Footer from "./components/Footer2Roster";
import FooterProfile from "./components/Footer2Profile";
import ShowFooter from "./components/ShowFooter2Roster";
import ShowProfile from "./components/ShowFooter2Profile";
function App() {
  return (
    <BrowserRouter>
      <ShowBar>
        <ResponsiveAppBar />
      </ShowBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:gymnastId" element={<GymnastDetails />} />
        <Route path="/roster" element={<Roster />} />
        <Route path="/newgymnast" element={<NewGymnast />} />
        <Route path="/updategymnast/:gymnastId" element={<UpdateGymnast />} />
      </Routes>
      <ShowFooter>
        <Footer />
      </ShowFooter>
      <ShowProfile>
        <FooterProfile />
      </ShowProfile>
    </BrowserRouter>
  );
}
export default App;
