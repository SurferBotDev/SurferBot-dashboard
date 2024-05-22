import { SurferBotProvider } from './context/SurferBotContext';
import BotStatusTable from './components/BotStatusTable'
import {ThemeProvider } from "next-themes";
import Navbar from './components/Navbar';

import { ModalProvider } from "./context/ModalContext";
function App() {
  return (
    <SurferBotProvider baseURL="http://127.0.0.1:8081" password="your_password_here">
      <ThemeProvider  attribute="class" defaultTheme="dark" enableSystem={false}>
      <ModalProvider>

        <div className="App">
          <Navbar/>
          <BotStatusTable />
        </div>
      </ModalProvider>
      </ThemeProvider>
    </SurferBotProvider>
  );
}

export default App;
