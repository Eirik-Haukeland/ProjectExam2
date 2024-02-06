import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from "./components/Layout/index.jsx"
import Home from "./pages/Home/index.jsx"
import venuePage from "./pages/VenuePage/index.jsx"
import profilePage from "./pages/ProfilePage/index.jsx"


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route index Component={Home}/>
        <Route path="venue/:venueId" Component={venuePage}/>
        <Route path="profile" Component={profilePage}/>
      </Routes>
    </Layout>
  </BrowserRouter>,
);
