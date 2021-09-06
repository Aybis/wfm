import React from 'react';
import { Bar } from 'react-chartjs-2';

const ChartBar = ({ title }) => {
  const data = {
    labels: ['Hadir', 'Sakit', 'Cuti', 'SPPD', 'Cuti'],
    datasets: [
      {
        label: '# of Employee',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Custom Chart Title',
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    legend: {
      display: true,
      position: 'right',
      align: 'center',
    },
    scales: {
      yAxes: [
        {
          grid: {
            drawBorder: true,
            display: false,
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          grid: {
            drawBorder: true,
            display: false,
            drawTicks: false,
          },
        },
      ],
    },
  };

  return (
    <div className="flex h-72 lg:h-full ">
      <div className="relative w-full xl:h-96">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartBar;
