
export default function createDataForChart(chartType, arrayForChart) {
    let dataChart;
    if(chartType === "barras"){
        dataChart = {
          labels: arrayForChart.map((data) => data.value),
          datasets: [
            {
              label: "Relaciones Normales",
              data: arrayForChart.map((data) => data.normales),
              backgroundColor: ["#FAAD42"],
            },
            {
              label: "Relaciones Anómalas",
              data: arrayForChart.map((data) => data.anomalias),
              backgroundColor: ["#F25C29"],
            },
          ],
        };
      }else if(chartType === "burbuja"){
        dataChart = {
          datasets: [
            {
              label: "Relaciones Anómalas",
              data: arrayForChart["anomalias"],
              backgroundColor: 'rgba(242, 92, 41, 0.5)',
            },
            {
              label: "Relaciones Normales",
              data: arrayForChart["normales"],
              backgroundColor: 'rgba(250, 173, 66, 0.5)',
            }
          ],
        };
      }else{
        dataChart = {
          labels: arrayForChart.map((data) => data.value),
          datasets: [{
              label: 'Número de anomalías',
              data: arrayForChart.map((data) => data.anomalias),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            }
          ],
        };
      }
  
    return dataChart;
}
