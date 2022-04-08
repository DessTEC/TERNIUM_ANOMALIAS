import { Outlet  } from "react-router-dom";
import { Navbar } from "../NavBar/NavBar";


export const Dashboard = () => {
    return (
        <>
            <div className="relative">
                <Navbar/>

                <div className="absolute top-20 w-full">
                    <Outlet/>
                </div>
            </div>
        </>
    );
};