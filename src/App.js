import logo from './logo.svg';
import './App.css';

function App() {
  return (
  <div className="App">
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-500 mb-4">
        Tailwind is working!
      </h1>
      <button className="px-6 py-3 bg-red-500 text-white rounded hover:bg-green-600 transition">
        Click Me
      </button>
    </div>
    </div>
  );
}

export default App;
