import { hydrateRoot } from "react-dom/client"
import { StartClient } from "@tanstack/react-start"
import { createRouter } from "./router"

hydrateRoot(document, <StartClient router={createRouter()} />)
