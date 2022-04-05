import React from 'react';
import { Routes, Route, BrowserRouter  } from "react-router-dom";
import {HomeScreen} from '../components/HomeScreen/HomeScreen';
import {DashboardRoutes} from './DashboardRoutes';

export const AppRouter = () => {
    return (
        <BrowserRouter>

          <Routes>

            <Route path="/" element={<HomeScreen />} />
            <Route path="/*" element={<DashboardRoutes/>} />

          </Routes>
        </BrowserRouter>
    );
};