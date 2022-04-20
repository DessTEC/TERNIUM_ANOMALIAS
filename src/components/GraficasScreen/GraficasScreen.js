import { ChartWrapper } from "../charts/ChartWrapper";
import AddGraph from "./AddGraph";
import DownloadButton from "./DownloadButton";
import {useState} from 'react';

export const GraficasScreen = () => {

  const [charts, setCharts] = useState([]);

  return (
    <div>
      <div className="flex justify-end mt-2">
        <DownloadButton />
        <AddGraph 
          text="Agregar gráfica"
          setCharts = {setCharts}
          charts = {charts}
        />
      </div>

      {charts.length > 0 ? 
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-evenly justify-items-center">
          {
            charts.map( chart => {
                return(
                    <ChartWrapper 
                        key = {chart.id}
                        chartData = {chart.data}
                        options = {chart.options}
                        type = {chart.type}
                    />
                );
            })
          }
        </div> 
        :
        <div>
          <h2>Agrega una gráfica</h2>
        </div>
      }
      
    </div>
  );
};
