import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Layout from './Layout';
import Home from './Home';
import About from './About';
import Team from './Team';
import Mission from './Mission';
import Services from './Services';
import WebDev from './WebDev';
import Mobile from './Mobile';
import Contact from './Contact';
import NotFound from './NotFound';
//npm install react-router-dom

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* About with nested routes */}
          <Route path="about" element={<About />}>
            <Route index element={<Navigate to="team" replace />} /> {/* Redirect to /about/team */}
            <Route path="team" element={<Team />} />
            <Route path="mission" element={<Mission />} />
          </Route>

          {/* Services with nested routes */}
          <Route path="services" element={<Services />}>
            {/* <Route index element={<Navigate to="mobile" replace />} />  */}{/* Default redirect */}
            <Route path="webdev" element={<WebDev />} />
            <Route path="mobile" element={<Mobile />} />
          </Route>

          <Route path="contact" element={<Contact />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
