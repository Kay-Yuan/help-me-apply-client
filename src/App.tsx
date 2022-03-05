import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Routes from "./routes/index.jsx";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
