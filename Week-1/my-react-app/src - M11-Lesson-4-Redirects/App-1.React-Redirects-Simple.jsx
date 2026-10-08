import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import NotFound from "./NotFound";
import "./App.css"; // Make sure this file exists

const App = () => {
  return (
    <Router>
      <div className="nav-title">React Redirects</div>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="about">About</Link>
          </li>
          <li>
            <Link to="contact">Contact</Link>
          </li>
          <li>
            <Link to="old-about">Old-About</Link>
          </li>
        </ul>
      </nav>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="old-about" element={<Navigate to="/about" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
/*
What does replace mean?

replace tells React Router to replace the current URL in the browser's history instead of adding a new entry.

For example, suppose the user enters an invalid URL:

http://localhost:3000/abc

Your route catches it:

<Route path="*" element={<Navigate to="/" replace />} />

and redirects to:

http://localhost:3000/
Without replace

If you write:

<Navigate to="/" />

the browser history becomes:

/        ← previous page
/abc     ← current page

After redirect:

/        ← previous
/abc     ← history entry
/        ← current

So if the user clicks the Back button, the browser may go back to /abc, which immediately redirects to / again.

With replace
<Navigate to="/" replace />

React Router replaces /abc with /:

/        ← current

There is no /abc history entry.

So when the user clicks Back, they go to the page they were actually on before entering /abc.

Simple way to remember

replace = "Don't add this navigation to browser history; replace the current history entry."
*/
