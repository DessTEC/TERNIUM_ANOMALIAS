import { Routes, Route  } from "react-router-dom";
import { GraficasScreen } from "../components/GraficasScreen/GraficasScreen";
import { TablaScreen } from "../components/TablaScreen/TablaScreen";
import { TabBar } from "../components/TabBar/TabBar";

export const ConsultaRoutes = () => {
    return (
        <>
            <TabBar/>

            <div className="container">
                <Routes>
                    <Route path="/tabla" element={<TablaScreen />} />
                    <Route path="/graficas" element={<GraficasScreen />} />

                    <Route path="/" element={<TablaScreen />} />

                </Routes>
            </div>
        </>
    );
};