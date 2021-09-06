import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const ChartBarGroup = ({ title }) => {
  const data = {
    labels: ['Non.Dir', 'OPS', 'FBS', 'Sales'],
    datasets: [
      {
        label: 'At Office',
        data: [12, 19, 3, 5],
        backgroundColor: '#BFDBFE',
      },
      {
        label: 'At Home',
        data: [2, 3, 20, 5],
        backgroundColor: '#60A5FA',
      },
      {
        label: 'At Satelit',
        data: [3, 10, 13, 15],
        backgroundColor: '#2563EB',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
        text: title,
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      legend: {
        display: true,
        position: 'bottom',
        align: 'center',
      },
    },
    scales: {
      yAxes: [
        {
          grid: {
            display: false,
            show: false,
            drawOnChartArea: false,
            color: 'rgba(0, 0, 0, 0)',
          },
          gridLines: {
            display: false,
            zeroLineColor: 'white',
            color: 'transparent',
          },
          ticks: {
            beginAtZero: true,
            display: false,
          },
        },
      ],
      xAxes: [
        {
          grid: {
            display: false,
            show: false,
            drawOnChartArea: false,
            color: 'rgba(0, 0, 0, 0)',
          },
          gridLines: {
            display: false,
            show: false,
            drawOnChartArea: false,
            color: 'rgba(0, 0, 0, 0)',
          },
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 1,
            display: false,
          },
        },
      ],
    },
  };
  return (
    <div className="flex h-72 sm:h-full md:h-auto ">
      <div className="relative w-full xl:h-96">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartBarGroup;
