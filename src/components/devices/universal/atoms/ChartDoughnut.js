import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const ChartDoughnut = ({ title, dataSets }) => {
  let label = dataSets?.map((item) => {
    return item.name;
  });

  let value = dataSets?.map((item) => {
    return item.value;
  });

  const data = {
    labels: label,
    datasets: [
      {
        label: '# of Employee',
        data: value,
        backgroundColor: [
          '#6EE7B7',
          '#93C5FD',
          '#C4B5FD',
          '#FCA5A5',
          '#F9A8D4',
        ],
        borderColor: ['#fff', '#fff', '#fff'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: false,
        text: title,
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      legend: {
        labels: {
          padding: 20,
        },
        display: true,
        position: 'bottom',
        align: 'center',
        padding: {
          top: 20,
          bottom: 10,
          left: 20,
          right: 40,
        },
      },
    },
  };

  return (
    <div className="flex  sm:h-auto sm:w-auto lg:h-full lg:w-full justify-center items-center">
      <div className="relative w-full sm:w-4/6 lg:w-5/6">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartDoughnut;
