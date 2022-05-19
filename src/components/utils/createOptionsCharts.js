export default function createOptionsCharts(analysisType, varX, varY, valueY){
    return({
    barras: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: {
          stacked: true,
          title: {
            display:true,
            text: "Variable",
            font: {
              size: 14
            }
          }
        },
        y: {
          stacked: true,
          title: {
            display:true,
            text: "Total de datos",
            font: {
              size: 14
            }
          }
        },
      },
    },
    dona: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: analysisType === "Anomalías" ? `Anomalías ${varX}`: `Anomalías ${varX} - ${varY}:${valueY}`,
        },
      },
    },
    burbuja: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display:true,
            text: "",
            font: {
              size: 14
            }
          }
        },
        y: {
          title: {
            display:true,
            text: "",
            font: {
              size: 14
            }
          } 
        },
      },
      plugins: {
        tooltip: {
            callbacks: {
                label: function(context) {
                    let label = context.dataset.label || ''; //Obtener label de contexto

                    if (label) {
                        label += ': '; //Agregar dos puntos
                    }
                    if (context.parsed._custom !== null) { //Si el radio no es nulo
                        label += context.raw.realR //Acceder a la información raw y obtener el valor del radio sin normalizar
                    }
                    return label;
                }
            }
        }
      }
    }
  })}