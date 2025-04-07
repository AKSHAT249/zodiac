import 'chart.js/auto';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { PivotConfig, ResultSet } from '@cubejs-client/core';
import { type ChartType } from './types';

interface ChartViewerProps {
  resultSet: ResultSet;
  pivotConfig: PivotConfig;
  chartType: ChartType;
}

export function ChartViewer(props: ChartViewerProps) {
  const { resultSet, pivotConfig, chartType } = props;
  console.log("eeeeeeeeeeeee", chartType);
  const data = {
    labels: resultSet.chartPivot(pivotConfig).map((row) => row.x),
    datasets: resultSet.series(pivotConfig).map((item) => {
      return {
        fill: chartType === 'pie',
        label: item.title,
        data: item.series.map(({ value }) => value)
      };
    }),
  };

  const ChartElement = {
    area: Line,
    bar: Bar,
    doughnut: Doughnut,
    line: Line,
    pie: Pie
  }[chartType as Exclude<ChartType, 'table'>];

  return <ChartElement data={data} />;
}



// import 'chart.js/auto';
// import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
// import { PivotConfig, ResultSet } from '@cubejs-client/core';
// import { type ChartType } from './types';

// interface ChartViewerProps {
//   resultSet: ResultSet;
//   pivotConfig: PivotConfig;
//   chartType: ChartType;
// }

// export function ChartViewer(props: ChartViewerProps) {
//   const { resultSet, pivotConfig, chartType } = props;
//   const isPieChart = chartType === 'pie' || chartType === 'doughnut';

//   const data = isPieChart
//     ? {
//         labels: resultSet.chartPivot(pivotConfig).map((row) => row.x),
//         datasets: [
//           {
//             data: resultSet.chartPivot(pivotConfig).map((row) => row.y),
//             backgroundColor: [
//               '#FF6384',
//               '#36A2EB',
//               '#FFCE56',
//               '#4BC0C0',
//               '#9966FF',
//               '#FF9F40',
//             ],
//           },
//         ],
//       }
//     : {
//         labels: resultSet.chartPivot(pivotConfig).map((row) => row.x),
//         datasets: resultSet.series(pivotConfig).map((item) => ({
//           fill: chartType === 'pie',
//           label: item.title,
//           data: item.series.map(({ value }) => value),
//         })),
//       };

//   const ChartElement = {
//     area: Line,
//     bar: Bar,
//     doughnut: Doughnut,
//     line: Line,
//     pie: Pie
//   }[chartType as Exclude<ChartType, 'table'>];

//   return <ChartElement data={data} />;
// }
