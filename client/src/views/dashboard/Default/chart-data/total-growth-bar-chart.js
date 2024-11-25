const chartData = {
  height: 480,
  type: 'bar',
  options: {
    chart: {
      id: 'bar-chart',
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%'
      }
    },
    xaxis: {
      type: 'category',
      categories: ['A', 'B', 'C', 'D', 'G', 'H', 'M', 'N', 'L', 'K', 'SMS', 'R&D']
    },
    legend: {
      show: true,
      fontSize: '14px',
      fontFamily: `'Roboto', sans-serif`,
      position: 'bottom',
      offsetX: 20,
      labels: {
        useSeriesColors: true
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8
      }
    },
    fill: {
      type: 'solid'
    },
    dataLabels: {
      enabled: true,// Enable data labels
      style:{
        fontSize: 8,
      }
    },
    grid: {
      show: true
    }
  },
  series: [
    {
      name: 'Classrooms',
      data: [35, 125, 35, 35, 35, 80, 35, 20, 35, 45, 15, 75]
    },
    {
      name: 'Laboratories',
      data: [35, 15, 15, 35, 65, 40, 80, 25, 15, 85, 25, 75]
    },
    {
      name: 'Staffrooms',
      data: [35, 145, 35, 35, 20, 105, 100, 10, 65, 45, 30, 10]
    },
    {
      name: 'Seminar Halls',
      data: [0, 0, 75, 0, 0, 115, 0, 0, 0, 0, 150, 0]
    }
  ]
};

export default chartData;
