import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/ui/foundation/App";
import { MemoryRouter } from "react-router-dom";

ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
).render(
    <React.StrictMode>
        <MemoryRouter>
            <App />
        </MemoryRouter>
    </React.StrictMode>
);
