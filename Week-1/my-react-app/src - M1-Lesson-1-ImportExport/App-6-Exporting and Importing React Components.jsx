//6. Exporting and Importing React Components
import Header from './Header';       // default export
import { Footer } from './Footer';   // named export
import "./App.css";
function App() {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
}
export default App;