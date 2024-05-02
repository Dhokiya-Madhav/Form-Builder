import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import RightSidebar from './components/RightSidebar';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Canvas from './pages/Canvas';

function App() {
  return (
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Navbar />
            <div className="flex">
              {/* Main Content */}
              <div className="flex-1">
                <Routes>
                  <Route path="/canvas" element={<Canvas />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </DndProvider>
    </BrowserRouter>
  );
}

export default App;
