export default function createOptionsCharts(analysisType, varX, varY, valueY){

    return({
      barras: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          datalabels: {
            display: false,
          },
          zoom: {
            pan: {
              enabled: true,
              mode: "xy"
            },
            zoom: {
              mode: "xy",
              wheel: {
                enabled: true
              }
            },
            limits: {
              x: {min: 0, max: 'original'},
              y: {min: 0, max: 'original'}
            },
          }
        },
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
            text: analysisType === "Anomalías" ? `Anomalías ${varX}`: analysisType === "Correlación Puntual" ? `Anomalías ${varX} - ${varY}:${valueY}` : `Anomalías x:${varX} y:${varY}`,
          },
          datalabels: {
            display: 'auto',
            align: 'center',
            color: '#4B4B4B',
            borderRadius: 3,
            font: {
              size: 18,
            }
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
          datalabels: {
            display: false,
          },
          zoom: {
            pan: {
              enabled: true,
              mode: "xy"
            },
            zoom: {
              mode: "xy",
              wheel: {
                enabled: true
              }
            },
            limits: {
              x: {min: 0, max: 'original'},
              y: {min: 0, max: 'original'}
            },
          },
          tooltip: {
              callbacks: {
                  label: function(context) {
                      console.log(context.raw);
                      let label = context.dataset.label || ''; //Obtener label de contexto
  
                      if (label) {
                          label += ': '; //Agregar dos puntos
                      }
                      if (context.parsed._custom !== null) { //Si el radio no es nulo
                          label += context.raw.realR //Acceder a la información raw y obtener el valor del radio sin normalizar
  
                          //Añadir coordenadas de burbuja
                          label += ` x: ${context.raw.x} y: ${context.raw.y}`;
                      }
                      return label;
                  }
              }
          }
        }
      }
    }
    )
  }
