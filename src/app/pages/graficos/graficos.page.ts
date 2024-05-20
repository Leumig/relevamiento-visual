import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { BdFotosService } from 'src/app/services/bd-fotos.service';
import { Foto } from 'src/app/models/foto';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.page.html',
  styleUrls: ['./graficos.page.scss'],
})
export class GraficosPage implements OnInit, OnDestroy, AfterViewChecked {
  fotosLindas: Foto[] = [];
  fotosFeas: Foto[] = [];
  filtro: string = 'lindas'; // Filtro inicial
  fotoSeleccionada: Foto | null = null;

  private pieChart: any; // Gráfico torta
  private barChart: any; // Gráfico barra
  private graficosCreados: boolean = false;

  constructor(private bdFotosService: BdFotosService) {}

  // Cargo los datos de todas las fotos al inicializar
  ngOnInit() {
    this.cargarDatos();
  }


  // Destruyo los gráficos al destruir el componente
  ngOnDestroy() {
    this.destruirGraficoLindas();
    this.destruirGraficoFeas();
  }

  
  // Cada vez que se abre la página, cargo los datos
  async ionViewWillEnter() {
    this.fotosLindas = await this.bdFotosService.obtenerFotos('lindas');
    this.fotosFeas = await this.bdFotosService.obtenerFotos('feas');
  }


  // Una vez que se hace la verificación de cambios en la vista, creo los gráficos
  ngAfterViewChecked() {
    if (!this.graficosCreados) {
      if (this.filtro === 'lindas') {
        this.crearGraficoLindas();
      } else if (this.filtro === 'feas') {
        this.crearGraficoFeas();
      }
      this.graficosCreados = true;
      // Si ya estaban creados, solamente pongo en true a graficosCreados
    }
  }


  // Función que se ejecuta al inicializar, toma los datos de las fotos y crea el gráfico
  async cargarDatos() {
    this.fotosLindas = await this.bdFotosService.obtenerFotos('lindas');
    this.fotosFeas = await this.bdFotosService.obtenerFotos('feas');

    // Creo el gráfico inicial dependiendo del filtro
    if (this.filtro === 'lindas') {
      this.crearGraficoLindas();
    } else if (this.filtro === 'feas') {
      this.crearGraficoFeas();
    }
  }


  // Funciones que destruyen el gráfico correspondiente
  destruirGraficoLindas() {
    if (this.pieChart) {
      this.pieChart.destroy();
      this.pieChart = null;
    }
  }
  destruirGraficoFeas() {
    if (this.barChart) {
      this.barChart.destroy();
      this.barChart = null;
    }
  }


  // Función que se ejecuta al cambiar el filtro
  onFiltroChange(event: any) {
    this.graficosCreados = false;
    // Marcar gráficos como no creados

    this.filtro = event.detail.value;
    // Tomo el valor de qué filtro se seleccionó

    this.fotoSeleccionada = null;
    // Borro la foto que se estaba mostrando

    // Creo el gráfico dependiendo del tipo
    if (this.filtro === 'lindas') {
      this.crearGraficoLindas();
    } else if (this.filtro === 'feas') {
      this.crearGraficoFeas();
    }
  }


  // Función que crea el gráfico de cosas lindas
  async crearGraficoLindas() {
    this.destruirGraficoLindas();
    // Destruyo el gráfico anterior si es que existe

    const canvas = document.getElementById('pieChartLindas') as HTMLCanvasElement;
    if (canvas) {
      const labels = this.fotosLindas.map(foto => foto.nombre);
      const data = this.fotosLindas.map(foto => foto.votos);
  
      this.pieChart = new Chart(canvas, {
        type: 'pie', // Tipo torta
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            legend: {
              display: false // Oculto las leyendas
            }
          },
          onClick: (event, elements) => {
            if (elements.length > 0) {
              const index = elements[0].index;
              const fotoSeleccionada = this.fotosLindas[index];
              console.log('Foto seleccionada:', fotoSeleccionada);
              this.mostrarFotoSeleccionada(fotoSeleccionada);
            }
          }
        }
      });
    }
  }
  

  async crearGraficoFeas() {
    this.destruirGraficoFeas();
    // Destruyo el gráfico anterior si es que existe
  
    const canvas = document.getElementById('barChartFeas') as HTMLCanvasElement;
    if (canvas) {
      const labels = this.fotosFeas.map(foto => foto.nombre);
      const data = this.fotosFeas.map(foto => foto.votos);
  
      this.barChart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Votos',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            },
            x: {
              ticks: {
                display: false // Oculto las etiquetas del eje x
              }
            }
          },
          plugins: {
            legend: {
              display: false // Oculto las leyendas
            },
            tooltip: {
              callbacks: {
                title: (context) => {
                  return labels[context[0].dataIndex];
                }
              }
            }
          },
          onClick: (event, elements) => {
            if (elements.length > 0) {
              const index = elements[0].index;
              const fotoSeleccionada = this.fotosFeas[index];
              console.log('Foto seleccionada:', fotoSeleccionada);
              this.mostrarFotoSeleccionada(fotoSeleccionada);
            }
          }
        }
      });
    }
  }

  // Función para mostrar la foto seleccionada
  mostrarFotoSeleccionada(foto: Foto) {
    this.fotoSeleccionada = foto;
  }
}