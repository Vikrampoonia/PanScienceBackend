import logo from './logo.svg';
import './App.css';
import routes from './routes/routeConfig';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';



function App() {
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route 
            key={index} 
            path={route.path} 
            element={route.element} 
          />
        ))}
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
