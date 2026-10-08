// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import NotFound from './NotFound';
import Layout from './Layout'; // ✅ Import Layout
//npm install react-router-dom
function App() {
  return (
    <Router>
      <Routes>
        {/* Parent Route */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />                 {/* same as path="/" */}
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Catch-all Route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
