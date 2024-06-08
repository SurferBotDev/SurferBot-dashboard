import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "next-themes";
import { SurferBotProvider } from './context/SurferBotContext';
import { ModalProvider } from "./context/ModalContext";
import BotStatus from './components/BotStatus';
import ProxyStatus from './components/ProxyStatus';
import Navbar from './components/Navbar';
import Executor from './components/Executor';
import { ToastContainer } from 'react-toastify';

function App() {
  const baseUrl = `http://${window.location.hostname}:8081`;
  
  return (
    <SurferBotProvider baseURL={baseUrl} password="your_password_here">
      <ToastContainer hideProgressBar={true}/>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <ModalProvider>
          <div className="App">
            <Router>
              <Navbar />
              <Routes>
                <Route path={"/*"} element={<BotStatus />} />
                <Route path="/proxy" element={<ProxyStatus />} />
                <Route path="/executor" element={<Executor />} />
              </Routes>
            </Router>
          </div>
        </ModalProvider>
      </ThemeProvider>
    </SurferBotProvider>
  );
}

export default App;
