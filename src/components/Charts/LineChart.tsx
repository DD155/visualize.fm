import { animated, useSpring } from '@react-spring/web'
import * as d3 from 'd3'
import { ScaleLinear, ScaleTime, axisBottom, axisLeft, pointer, select } from 'd3'
import { MouseEventHandler, useEffect, useMemo, useRef, useState } from 'react'

interface DesnityChartProps {
    width: number,
    height: number,
    data: number[]
}

interface MouseData {
    x: number, 
    y: number
}

interface AxisBottomProps {
    scale: ScaleTime<number, number, never>
    transform: string
}  

interface AxisLeftProps {
    scale: ScaleLinear<number, number, never>
}

interface LineItemProps {
    path: string
    color: string
}

interface CircleItemProps {
    color: string
    x: number
    y: number
    mouseOverFunc: MouseEventHandler
    mouseMoveFunc: MouseEventHandler
    mouseOutFunc: MouseEventHandler
}

/* X axis */
const AxisBottom = ({ scale, transform }: AxisBottomProps) => {
    const ref = useRef<SVGGElement>(null)
  
    useEffect(() => {
      if (ref.current) {
        select(ref.current).style("font-size", "10px").call(axisBottom(scale))
      }
    }, [scale])
  
    return <g ref={ref} transform={transform} />
}

/* Y Axis */
const AxisLeft = ({ scale }: AxisLeftProps) => {
    const ref = useRef<SVGGElement>(null)
  
    useEffect(() => {
      if (ref.current) {
        select(ref.current).style("font-size", "12px").call(axisLeft(scale))
      }
    }, [scale])
  
    return <g ref={ref}  />
}


/* Line Component using React Spring for Transitions */
const LineItem = ({ path, color }: LineItemProps) => {
    const springProps = useSpring({
      to: {
        path,
        color,
      },
      config: {
        friction: 75,
      },
    })
  
    return (
      <animated.path
        d={springProps.path}
        fill={"none"}
        stroke={color}
        strokeWidth={2}
      />
    )
}

/* Circle Component using React Spring for Transitions */
const MarkerItem = ({ x, y, mouseMoveFunc, mouseOutFunc, mouseOverFunc, color }: CircleItemProps) => {
    const springProps = useSpring({
      to: {
        x,
        y,
        color,
      },
      config: {
        friction: 75,
      },
    })
  
    return (
      <animated.circle
        cx={springProps.x}
        cy={springProps.y}
        r={4}
        fill={'red'}
        onMouseOver={mouseOverFunc}
        onMouseMove={mouseMoveFunc}
        onMouseOut={mouseOutFunc}
      />
    )
}

const getTransformedDataArr = (data:number[]):[number, number][] => {
    let transformedArr:[number, number][] = []
    let index = 0
    let sum = 0
    for (let i = 0; i <= data.length; i++) {
        sum += data[i]
        if (((i+1) % 4) == 0) {
            transformedArr.push([getDateBeforeWeeks(++index*4).getTime(), sum])
            sum = 0
        }
    }
    return transformedArr
}

const getDateBeforeWeeks = (weeks:number):Date => {
    return new Date((new Date()) // endDate is 52*7 days before current date
    .setDate(
        new Date()
        .getDate() - (weeks*7))
    ) 
}
 
export const LineChart = ({width, height, data}: DesnityChartProps) => {
    /* For tooltip */ 
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [hoveredTime, setHoveredTime] = useState<Date[]>([]) // contains the previous and current times when data point is hovered
    const [hoveredPlays, setHoveredPlays] = useState<number>(0)
    const [mouseLocation, setMouseLocation] = useState<MouseData>({
        x: 0,
        y: 0
    })

    const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };
    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;

    const density:[number, number][] = getTransformedDataArr(data)
    const xScale = d3.scaleTime()
        .domain([density[0][0], getDateBeforeWeeks(52.5)])
        .range([0, width - MARGIN.left - MARGIN.right])    
    
    const yScale = useMemo(() => {
        const max = Math.max(...density.map((d) => d[1]));
        return d3.scaleLinear().range([height, 10]).domain([0, max]);
    }, [data, height])

    const path = useMemo(() => {
        const lineGenerator = d3
          .line()
          .x((d) => xScale(d[0]))
          .y((d) => yScale(d[1]))
        return lineGenerator(density);
    }, [density]) as string;
    
    const allCircles = density.map((item, i) => {
        return (
            <MarkerItem 
                key={i} 
                x={xScale(item[0])} 
                y={yScale(item[1])} 
                color={'red'} 
                mouseOverFunc={() => {
                    // If first index, set current date to previous date
                    (i === 0) ? setHoveredTime([new Date(), new Date(density[i][0])]) 
                        : setHoveredTime([new Date(density[i-1][0]), new Date(density[i][0])])
                    
                    setHoveredPlays(item[1])
                    setIsHovered(true)
                }}
                mouseOutFunc={() => {
                    setIsHovered(false)
                }}
                mouseMoveFunc={(e) => {
                    setMouseLocation({
                        x: pointer(e)[0],
                        y: pointer(e)[1]
                    })
                }}
            />
        );
    });

    const hoverPositionStyle = {
        top:`${mouseLocation.y + height + 288 + MARGIN.top + MARGIN.bottom + 75}px`,
        left: `${mouseLocation.x + width - MARGIN.left - 175}px`
    }

    return (
        <div>
            { isHovered &&
            <div className='absolute bg-white text-black p-1 text-xs border border-solid border-black rounded-tr-sm' style={hoverPositionStyle}>
                <span className='font-bold'>
                    {   
                        `\n${hoveredTime[0].toDateString().slice(4)} - ` + 
                        `${hoveredTime[1].toDateString().slice(4)}`
                    }
                </span>
                <br/>
                Scrobbles: {hoveredPlays} 
                
            </div>
            }
            
            <svg width = {width} height = {height + MARGIN.bottom}>
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                >
                    <AxisBottom scale={xScale} transform={`translate(0, ${height})`} /> 
                    <AxisLeft scale={yScale} /> 
                    <LineItem path={path} color={'red'} />
                    {allCircles}
                </g>
            </svg>
        </div>
    )
}