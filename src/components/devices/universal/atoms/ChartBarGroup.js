import React from 'react';
import { Bar } from 'react-chartjs-2';

const ChartBarGroup = ({ title, dataSets }) => {
  let labelOne = dataSets?.map((item) => {
    return item.wfo;
  });

  let labelTwo = dataSets?.map((item) => {
    return item.wfh;
  });

  let labelThree = dataSets?.map((item) => {
    return item.satlit;
  });

  const data = {
    // labels: ['Non.Dir', 'Sales', 'OPS', 'FBS'],
    labels: dataSets?.map((item) => {
      if (item.name === 'NON DIREKTORAT') {
        return 'Non. Dir';
      } else if (item.name === 'MARKETING & SALES') {
        return 'Sales';
      } else if (item.name === 'FINANCE & BUSINESS SUPPORT') {
        return 'FBS';
      } else if (item.name === 'OPERATION') {
        return 'Operation';
      } else {
        return item.name;
      }
    }),

    datasets: [
      {
        label: 'At Office',
        data: labelOne,
        backgroundColor: '#BFDBFE',
      },
      {
        label: 'At Home',
        data: labelTwo,
        backgroundColor: '#60A5FA',
      },
      {
        label: 'At Satelit',
        data: labelThree,
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
