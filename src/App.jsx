import React from "react";
import Home from "./components/Home";
import { GlobalProvider } from "./context/GlobalContext";

function App() {
  return (
    <GlobalProvider>
      <Home />
    </GlobalProvider>
  );
}

export default App;
