import {HomeScreen} from '../components/HomeScreen/HomeScreen';
import { SubirArchivo } from '../components/SubirArchivo/SubirArchivo';
import { Dashboard } from '../components/DashBoard/DashBoard';
import { Historial } from "../components/Historial/Historial";
import { ModelosCorrida } from "../components/ModelosCorrida/ModelosCorrida";
import {TablaScreen} from "../components/TablaScreen/TablaScreen";
import {GraficasScreen} from "../components/GraficasScreen/GraficasScreen";
import {TabBar} from "../components/TabBar/TabBar";
import { NuevoModeloScreen } from '../components/nuevoModeloScreen/NuevoModeloScreen';
import SubirDatos from '../components/SubirArchivo/CargarArchivo/SubirDatos';
import RelacionarColumnas from '../components/SubirArchivo/Relacionar/RelacionarColumnas';
import Steps from '../components/SubirArchivo/Pasos/Steps';
import {Cargas_1} from '../components/Cargas/Cargas_1';

export const RoutesApp = [
    {path: "/", element: <HomeScreen />},
    {
      path: "/dashboard", 
      element: <Dashboard/>,
      children: [
        {
          path: "/dashboard/subir",
          element: <Steps/>,
          children: [
            { path: "/dashboard/subir", element: <SubirDatos/> },
            {
              path: "/dashboard/subir/parametros",
              element: <RelacionarColumnas/>,
            },
            { path: "/dashboard/subir/cargar", element: <Cargas_1/> },
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
          path: "/dashboard/consultar/:nombre/nuevoModelo", 
          element: <NuevoModeloScreen/>,
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