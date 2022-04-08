
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routers/AppRouter"

export const TerniumApp = () => {
    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
};