import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
const Graph = () => {
  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
          area: true,
        },
      ]}
      width={800}
      height={300}
    />
  )
}

export default Graph