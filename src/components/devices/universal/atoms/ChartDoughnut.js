import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const ChartDoughnut = ({ title }) => {
  const data = {
    labels: ['Hadir', 'Tidak Hadir', 'Terlambat'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3],
        backgroundColor: ['#C7D2FE', '#818CF8', '#4F46E5'],
        borderColor: ['#fff', '#fff', '#fff'],
        borderWidth: 4,
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
