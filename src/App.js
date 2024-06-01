import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "next-themes";
import { SurferBotProvider } from './context/SurferBotContext';
import { ModalProvider } from "./context/ModalContext";
import BotStatus from './components/BotStatus';
import ProxyStatus from './components/ProxyStatus';
import Navbar from './components/Navbar';

function App() {
  const baseUrl = `http://${window.location.hostname}:8081`;
  
  return (
    <SurferBotProvider baseURL={baseUrl} password="your_password_here">
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <ModalProvider>
          <div className="App">
            <Router>
              <Navbar />
              <Routes>
                <Route path={"/*"} element={<BotStatus />} />
                <Route path="/proxy" element={<ProxyStatus />} />
              </Routes>
            </Router>
          </div>
        </ModalProvider>
      </ThemeProvider>
    </SurferBotProvider>
  );
}

export default App;
