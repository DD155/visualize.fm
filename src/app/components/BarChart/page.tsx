import { animated, useSpring } from "@react-spring/web";
import { trimString } from "Utils";
import {pointer, ScaleBand, ScaleLinear, axisBottom, axisLeft, scaleBand, scaleLinear, select } from "d3";
import { MouseEventHandler, useEffect, useRef, useState } from "react";

interface BarChartProps {
    data: ArtistData[]
    height: number
    width: number
    time: string
}

interface AxisBottomProps {
    scale: ScaleLinear<number, number, never>
    transform: string
}  

interface AxisLeftProps {
    scale: ScaleBand<string>
}

interface BarsProps {
    data: BarChartProps["data"]
    width: number
    scaleX: AxisBottomProps["scale"]
    scaleY: AxisLeftProps["scale"]
}

interface BarItemProps {
    color: string
    x: number
    y: number | undefined
    width: number
    height: number
    mouseOverFunc: MouseEventHandler
    mouseMoveFunc: MouseEventHandler
    mouseOutFunc: MouseEventHandler
}

interface BarAnimatedProps {
    width: number
    x: number
    y: number
}

interface MouseData {
    x: number, 
    y: number
}

const AxisBottom = ({ scale, transform }: AxisBottomProps) => {
    const ref = useRef<SVGGElement>(null)
  
    useEffect(() => {
      if (ref.current) {
        select(ref.current).style("font-size", "10px").call(axisBottom(scale))
      }
    }, [scale])
  
    return <g ref={ref} transform={transform} />
}

const AxisLeft = ({ scale }: AxisLeftProps) => {
    const ref = useRef<SVGGElement>(null)
  
    useEffect(() => {
      if (ref.current) {
        select(ref.current).style("font-size", "12px").call(axisLeft(scale))
      }
    }, [scale])
  
    return <g ref={ref}  />
}

const BarItem = ({ x, y, width, height, color, mouseMoveFunc, mouseOutFunc, mouseOverFunc, }: BarItemProps) => {
    const springProps = useSpring<BarAnimatedProps>({
        to: {
            width: width,
            y,
        },
        config: {
            precision: 0.1,
            friction: 100
        },
    })
  
    return (
      <animated.rect
        x={x}
        y={springProps.y}
        width={springProps.width}
        height={height}
        fill={color}
        onMouseOver={mouseOverFunc}
        onMouseMove={mouseMoveFunc}
        onMouseOut={mouseOutFunc}
      />
    )
}

export const BarChart = ({ time, data, width, height }: BarChartProps) => {
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [hoveredPlays, setHoveredPlays] = useState<number>(0)
    const [hoveredArtist, setHoveredArtist] = useState<string>("")
    const [mouseLocation, setMouseLocation] = useState<MouseData>({
        x: 0,
        y: 0
    })

    const margin = { top: 10, right: 10, bottom: 20, left: 150 }
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom

    const scaleX = scaleLinear()
        .domain([0, Math.max(...data.map(({ playcount }) => playcount))])
        .range([0, chartWidth])

    // create Y axis, this uses scaleLinear for linear spacing of steps from 0 to max plays
    const scaleY = scaleBand()
        .domain(data.map(({ name }) => (trimString(20, name))))
        .range([0, chartHeight])
        .padding(0.5)
    
    // create Bars for each data point, using React-Spring animated rects  
    const Bars =  data.map(({ name, playcount }, i) => (
            <BarItem
                key={`bar-${i}`}
                x={scaleX(0)}
                y={scaleY(trimString(20, name))}
                width={ scaleX(playcount) }
                height={scaleY.bandwidth()}
                color="#d51007" 
                mouseOverFunc={() => {
                    setHoveredPlays(playcount)
                    setHoveredArtist(name)
                    setIsHovered(true)
                }}
                mouseMoveFunc={(e) => {
                    setMouseLocation({
                        x: pointer(e)[0],
                        y: pointer(e)[1]
                    })
                }}
                mouseOutFunc={() => {
                    setIsHovered(false)
                }}
            /> ))
    
    const hoverPositionStyle = {
        top:`${mouseLocation.y + height - 30}px`,
        left: `${mouseLocation.x + width - margin.left}px`
    }

    return (
        <div>
            { isHovered &&
            <div className='absolute bg-white text-black p-1 text-xs border border-solid border-black rounded-tr-sm' style={hoverPositionStyle}>
                Scrobbles: {hoveredPlays} 
            </div>
            }
            <svg
                width={chartWidth + margin.left + margin.right}
                height={chartHeight + margin.top + margin.bottom}
            >
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <AxisBottom scale={scaleX} transform={`translate(0, ${chartHeight})`} /> 
                    <AxisLeft scale={scaleY} />   
                    {Bars}
                    {/* <title> {hoveredPlays} </title> */}
                </g>
            </svg>
        </div>
    )
}

