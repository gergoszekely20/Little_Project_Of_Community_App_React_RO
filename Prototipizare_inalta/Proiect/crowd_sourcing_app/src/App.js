import './stylesheets/App.css';
import {BrowserRouter, useRoutes} from "react-router-dom";
import Contact from "./components/views/Contact";
import Home from "./components/views/Home";

const AppRoutes = () => {
  return useRoutes([
    {path: '/', element: <Home/>},
    {path: '/home', element: <Home/>},
    {path: '/contact', element: <Contact/>},
  ]);
};

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
  );
}

export default App;
