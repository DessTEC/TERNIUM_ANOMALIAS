import { ChartWrapper } from "../charts/ChartWrapper";
import { BarChart } from "../charts/BarChart";
import { UserData } from "../../data/Data";

export const GraficasScreen = () => {

    const options = {
      plugins: {
        title: {
          display: true,
          text: 'Anomalías 2019',
        },
      },
      responsive: true,
      
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    };
  
    const userData = {
        labels: UserData.map((data) => data.planta),
        datasets: [
          {
            label: "Relaciones Normales",
            data: UserData.map((data) => data.normales),
            backgroundColor: [
              "#FAAD42"
            ],

          },
          {
            label: "Relaciones Anómalas",
            data: UserData.map((data) => data.anomalias),
            backgroundColor: [
              "#F25C29",
            ],

          },
        ],
      };

    return(
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-evenly justify-items-center">
        <ChartWrapper options = {options} chartData={userData} />
        <ChartWrapper options = {options} chartData={userData} />
        <ChartWrapper options = {options} chartData={userData} />
        <ChartWrapper options = {options} chartData={userData} />
      </div>
    );
}