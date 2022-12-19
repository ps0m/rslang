import {
  CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title,
  Tooltip
} from 'chart.js';
import { FC } from "react";
import { Line } from 'react-chartjs-2';
import { IItemOfLongTermStatistic, ILongTermStatistic } from '../../../types/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ILineChartProps {
  dataOfParents: ILongTermStatistic | undefined
}


export const LineChart: FC<ILineChartProps> = ({ dataOfParents }) => {

  const labels: string[] = dataOfParents ? Object.keys(dataOfParents) : []
  const dataOfParentsValue: IItemOfLongTermStatistic[] = dataOfParents ? Object.values(dataOfParents) : []
  const newLearned: number[] = dataOfParentsValue.map(item => item.newLearnedWords)
  const totalLearned: number[] = dataOfParentsValue.map(item => item.totalLearnedWords)

  const options = {
    responsive: true,
    fontSize: '30px',
    animations: {
      tension: {
        duration: 3000,
        from: 0.5,
        to: 0,
        loop: true
      }
    },
    scales: {
      y: {
        ticks: {
          font: {
            size: 16,
            family: '"Balsamiq Sans", sans- serif'
          }
        },
      },
      x: {
        ticks: {
          font: {
            size: 16,
            family: '"Balsamiq Sans", sans- serif'
          }
        },
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        display: true,
        labels: {
          color: '#000',
          font: {
            size: 20,
            family: '"Balsamiq Sans", sans- serif'
          }
        }
      },
      title: {
        display: true,
        text: 'Долгосрочная статистика',
        color: '#000',
        font: {
          size: 30,
          family: '"Balsamiq Sans", sans- serif'
        }
      },
      tooltip: {
        caretSize: 20,
        titleFont: {
          size: 20,
          family: '"Balsamiq Sans", sans- serif'
        },
        bodyFont: {
          size: 16,
          family: '"Balsamiq Sans", sans- serif'
        }
      },
      LinearScale: {
        ticks: {
          color: '#fff'
        }
      }
    },

  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Количество новых слов в день',
        data: newLearned,
        borderColor: '#C13C37',
        backgroundColor: '#C13C37',
        borderWidth: 5,
        pointBorderColor: '#111',
        radius: 5,
      },
      {
        label: 'Общее количество изученных слов',
        data: totalLearned,
        borderColor: '#E38627',
        backgroundColor: '#E38627',
        borderWidth: 5,
        pointBorderColor: '#111',
        radius: 5
      },
    ],
  };

  return <Line options={options} data={data} />;
}
