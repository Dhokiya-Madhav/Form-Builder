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
      <div className="flex">
        <DndProvider backend={HTML5Backend}>
          <Sidebar />
        </DndProvider>
        <div className="flex-1">
          <Navbar />
          <div className="flex">
            {/* Main Content */}
            <div className="flex-1">
              <Routes>
                {/* Define your routes here */}
                <Route path="/canvas" element={<DndProvider backend={HTML5Backend}><Canvas /></DndProvider>} />
              </Routes>
            </div>
            {/* Right Sidebar */}
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
