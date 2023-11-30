import { Bar } from "react-chartjs-2";

export const BarChart = ({ chartData }) => {
  return (
    <div>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: true,
              position: "top",
              align: "end",
            labels: {
              usePointStyle: true,
            }
            }
          },
          indexAxis: 'y',
          elements: {
            bar: {
              borderWidth: 1,
            },
          },
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              grid: {
                display: false
              }
            }
          },
        }}
      />
    </div>
  );
};