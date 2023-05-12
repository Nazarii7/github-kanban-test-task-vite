import ReactDOM from "react-dom/client";
import App from "./component/App/App.tsx";
import CSSBaseline from "@mui/material/CssBaseline";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <CSSBaseline />
    <App />
  </>
);
