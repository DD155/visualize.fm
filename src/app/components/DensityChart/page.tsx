import * as d3 from 'd3'

interface DesnityChartProps {
    width: number,
    height: number,
    data: number[]
}



export const DensityChart = ({width, height, data}: DesnityChartProps) => {
    console.log(data)
    return (
        <div>
            <svg width = {width} height = {height}>

            </svg>
        </div>
    )
}