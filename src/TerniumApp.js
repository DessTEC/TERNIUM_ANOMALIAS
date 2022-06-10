
import { HashRouter } from "react-router-dom";
import { AppRouter } from "./routers/AppRouter"

export const TerniumApp = () => {
    return (
        <HashRouter basename={process.env.PUBLIC_URL}>
            <AppRouter/>
        </HashRouter>
    );
};