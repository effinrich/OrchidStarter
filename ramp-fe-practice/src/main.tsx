import ReactDOM from "react-dom/client"
import { App } from "./App"
import "./index.css"

// Note: StrictMode intentionally omitted so effects fire once (clearer for this exercise).
ReactDOM.createRoot(document.getElementById("root")!).render(<App />)
