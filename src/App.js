import { createContext, useState } from "react";
import "./App.css";
import Card from "./components/Card";
export { createContext, useState } from "react";
import ReactSwitch from "react-switch";
export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((curr) => {
      if (curr === "light") {
        return "dark";
      } else {
        return "light";
      }
    });
  };
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="App" id={theme}>
        <header className="App-header">
          <h3>Weather App</h3>
          <div className="switch">
            <h6>Change Theme: </h6>
            <ReactSwitch
              onChange={toggleTheme}
              checked={theme === "dark"}
              uncheckedIcon={false}
              checkedIcon={false}
            />
          </div>
        </header>
        <Card />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
