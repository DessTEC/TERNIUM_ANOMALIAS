import { Routes, Route  } from "react-router-dom";

import { Navbar } from "../components/NavBar/NavBar";
import {SubirArchivo} from '../components/SubirArchivo/SubirArchivo';
import {HomeScreen} from '../components/HomeScreen/HomeScreen';
import { ConsultaRoutes } from "./ConsultaRoutes";

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar/>

            <div className="container">
                <Routes>
                    <Route path="/subir" element={<SubirArchivo />} />
                    <Route path="/" element={<HomeScreen />} />

                    <Route path="/consultar/*" element={<ConsultaRoutes />} />

                </Routes>
            </div>
        </>
    );
};