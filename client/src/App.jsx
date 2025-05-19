import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import themeConfig from "./configs/config.theme";

const App = () => {
  const { themeMode } = useSelector((state) => state.theme);
  return (
    <ThemeProvider theme={themeConfig.custom({ mode: themeMode })}>
      {/* config toastify  */}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={themeMode}
      />
      <CssBaseline />
      {/* config theme */}
      {/* <ThemeProvider theme={themeConfig.custom({ mode: themeMode })}> */}
      {/* <CssBaseline /> */}
      {/* Your app content goes here */}
      <div>
        <h1>Hello, World!</h1>
      </div>
    </ThemeProvider>
  );
};

export default App;
