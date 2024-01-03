import { ScaleBand, ScaleLinear, axisBottom, axisLeft, scaleBand, scaleLinear, select } from "d3";
import { useEffect, useRef } from "react";

interface BarChartProps {
    data: ArtistData[]
}

interface AxisBottomProps {
    scale: ScaleBand<string>
    transform: string
}  

interface AxisLeftProps {
    scale: ScaleLinear<number, number, never>
}

interface BarsProps {
    data: BarChartProps["data"]
    height: number
    scaleX: AxisBottomProps["scale"]
    scaleY: AxisLeftProps["scale"]
}

const AxisBottom = ({ scale, transform }: AxisBottomProps) => {
    const ref = useRef<SVGGElement>(null)
  
    useEffect(() => {
      if (ref.current) {
        select(ref.current).call(axisBottom(scale))
      }
    }, [scale])
  
    return <g ref={ref} transform={transform} />
}

const AxisLeft = ({ scale }: AxisLeftProps) => {
    const ref = useRef<SVGGElement>(null)
  
    useEffect(() => {
      if (ref.current) {
        select(ref.current).call(axisLeft(scale))
      }
    }, [scale])
  
    return <g ref={ref} />
}

// create Bars for each data point, using SVG Rects  
const Bars = ({ data, height, scaleX, scaleY }: BarsProps) => {
    return (
      <>
        {data.map(({ name, playcount }) => (
          <rect
            key={`bar-${name}`}
            x={scaleX(name)}
            y={scaleY(playcount)}
            width={scaleX.bandwidth()}
            height={height - scaleY(playcount)}
            fill="red"
          />
        ))}
      </>
    )
}
  
export const BarChart = ({ data }: BarChartProps) => {
    const margin = { top: 10, right: 0, bottom: 25, left: 30 }
    const width = 500 - margin.left - margin.right
    const height = 300 - margin.top - margin.bottom
    
    // create X axis, use scaleBand for even distribution of artist names. add padding for space b/w bars
    const scaleX = scaleBand()
        .domain(data.map(({ name }) => name))
        .range([0, width])
        .padding(0.5);

    // create Y axis, this uses scaleLinear for linear spacing of steps from 0 to max plays
    const scaleY = scaleLinear()
        .domain([0, Math.max(...data.map(({ playcount }) => playcount))])
        .range([height, 0])
      
    return (
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
            <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} /> 
            <AxisLeft scale={scaleY} />   
            <Bars data={data} height={height} scaleX={scaleX} scaleY={scaleY} />
        </g>
      </svg>
    )
}

