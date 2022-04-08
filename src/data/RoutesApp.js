import {HomeScreen} from '../components/HomeScreen/HomeScreen';
import { SubirArchivo } from '../components/SubirArchivo/SubirArchivo';
import { Dashboard } from '../components/DashBoard/DashBoard';
import { Historial } from "../components/Historial/Historial";
import { ModelosCorrida } from "../components/ModelosCorrida/ModelosCorrida";
import {TablaScreen} from "../components/TablaScreen/TablaScreen";
import {GraficasScreen} from "../components/GraficasScreen/GraficasScreen";
import {TabBar} from "../components/TabBar/TabBar";

export const RoutesApp = [
    {path: "/", element: <HomeScreen />},
    {
      path: "/dashboard", 
      element: <Dashboard/>,
      children: [
        {
          path: "/dashboard/subir",
          element: <SubirArchivo/>,
          children: [
            { path: "/dashboard/subir", element: <p>Paso 1</p> },
            {
              path: "/dashboard/subir/parametros",
              element: <p>Paso 2</p>,
            },
            { path: "/dashboard/subir/cargar", element: <p>Paso 3</p> },
          ],
        },
        { 
          path: "/dashboard/consultar", 
          element: <Historial/>,
        },
        {
          path: "/dashboard/consultar/:nombre", 
          element: <ModelosCorrida/>,
        },
        {
          path: "/dashboard/consultar/:nombre/:modelo", 
          element: <TabBar/>,
          children: [
            {path: "/dashboard/consultar/:nombre/:modelo", element: <TablaScreen/>},
            {path: "/dashboard/consultar/:nombre/:modelo/graficas", element: <GraficasScreen/>}
          ]
        },
      ]
    }
  ];