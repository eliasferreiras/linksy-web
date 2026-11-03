import { RouterProvider } from "react-router-dom";
import router from "./providers/routerProvider";

import { SessionProvider } from "./contexts/SessionContext";

function App() {
    return (
        <SessionProvider>
            <RouterProvider router={router} />
        </SessionProvider>
    );
}

export default App;