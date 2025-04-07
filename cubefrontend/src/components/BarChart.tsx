import cube, { PivotConfig, Query } from '@cubejs-client/core';
import { CubeProvider } from '@cubejs-client/react';
import WebSocketTransport from '@cubejs-client/ws-transport';
import { ChartViewer } from '../ChartViewer.tsx';
import { extractHashConfig } from '../config';
import { QueryRenderer } from '../QueryRenderer.tsx';
import { ChartType, Config } from '../types';

function BarChart() {
  const { apiUrl, apiToken, query, pivotConfig, chartType, useWebSockets, useSubscription } = extractHashConfig(
    {
      apiUrl: import.meta.env.VITE_CUBE_API_URL || '',
      apiToken: import.meta.env.VITE_CUBE_API_TOKEN || '',
      query: {"dimensions":["sampledata.value","sampledata.name"],"measures":["sampledata.count"]} as Query,
      pivotConfig: {"x":["sampledata.value"],"y":["sampledata.name","measures"],"fillMissingDates":true,"joinDateRange":false} as PivotConfig,
      chartType: 'bar' as ChartType,
      websockets: import.meta.env.VITE_CUBE_API_USE_WEBSOCKETS === 'true',
      subscription: import.meta.env.VITE_CUBE_API_USE_SUBSCRIPTION === 'true',
    } as Config
  );

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

export default BarChart;
