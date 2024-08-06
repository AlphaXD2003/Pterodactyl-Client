import React from 'react'
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
const Charts = () => {
  return (
    <SparkLineChart
    
    plotType="bar"
    data={[1, 4, 2, 5, 7, 2, 4, 6]}
    height={238}
    width={600}
  />
  )
}

export default Charts