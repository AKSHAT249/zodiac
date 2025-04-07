import cube, { PivotConfig, Query } from '@cubejs-client/core';
import { CubeProvider } from '@cubejs-client/react';
import WebSocketTransport from '@cubejs-client/ws-transport';
import { ChartViewer } from '../ChartViewer.tsx';
import { extractHashConfig } from '../config';
import { QueryRenderer } from '../QueryRenderer.tsx';
import { ChartType, Config } from '../types';


// VITE_CUBE_API_URL=http://localhost:4000/cubejs-api/v1
// VITE_CUBE_API_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NDM4NDg5NjMsImV4cCI6MTc0MzkzNTM2M30.HpKKE2ZPJUhjGQk2-ZaswNU--z6a74b74VyDaZXqpqk
// VITE_CUBE_QUERY={"dimensions":["sampledata.value","sampledata.timestamp"],"timeDimensions":[{"dimension":"sampledata.timestamp","granularity":"second"}]}
// VITE_CUBE_PIVOT_CONFIG={"x":["sampledata.timestamp","sampledata.timestamp.second"],"y":["sampledata.value"],"fillMissingDates":true,"joinDateRange":false}
// VITE_CHART_TYPE=line
// VITE_CUBE_API_USE_WEBSOCKETS=false
// VITE_CUBE_API_USE_SUBSCRIPTION=false

function PieChart() {
//   const { apiUrl, apiToken, query, pivotConfig, chartType, useWebSockets, useSubscription } = extractHashConfig(
//     {
//       apiUrl: import.meta.env.VITE_CUBE_API_URL || '',
//       apiToken: import.meta.env.VITE_CUBE_API_TOKEN || '',
//       query: JSON.parse(import.meta.env.VITE_CUBE_QUERY || '{}') as Query,
//       pivotConfig: JSON.parse(
//         import.meta.env.VITE_CUBE_PIVOT_CONFIG || '{}'
//       ) as PivotConfig,
//       chartType: "pie" as ChartType,
//       websockets: import.meta.env.VITE_CUBE_API_USE_WEBSOCKETS === 'true',
//       subscription: import.meta.env.VITE_CUBE_API_USE_SUBSCRIPTION === 'true',
//     } as Config
//   );

const { apiUrl, apiToken, query, pivotConfig, chartType, useWebSockets, useSubscription } = extractHashConfig(
    {
      apiUrl: import.meta.env.VITE_CUBE_API_URL || '',
      apiToken: import.meta.env.VITE_CUBE_API_TOKEN || '',
      query: {"dimensions":["sampledata.name"],"measures":["sampledata.count"]} as Query,
      pivotConfig: {"x":["sampledata.name"],"y":["measures"],"fillMissingDates":true,"joinDateRange":false} as PivotConfig,
      chartType: "pie" as ChartType,
      websockets: import.meta.env.VITE_CUBE_API_USE_WEBSOCKETS === 'true',
      subscription: import.meta.env.VITE_CUBE_API_USE_SUBSCRIPTION === 'true',
    } as Config
  );

  console.log("cccccccc",chartType);

  let transport = undefined;

  if (useWebSockets) {
    transport = new WebSocketTransport({ authorization: apiToken, apiUrl });
  }

  const cubeApi = cube(apiToken, { apiUrl, transport });

  return (
    <>

        
      <CubeProvider cubeApi={cubeApi}>
        <QueryRenderer query={query} subscribe={useSubscription}>
          {({ resultSet }) => {
            return (
              <ChartViewer
                chartType={chartType}
                resultSet={resultSet}
                pivotConfig={pivotConfig}
              />
            );
          }}
        </QueryRenderer>
      </CubeProvider>
    </>
  );
}

export default PieChart;
