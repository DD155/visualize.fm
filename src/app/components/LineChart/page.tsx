import * as d3 from 'd3'
import { ScaleLinear, axisBottom, pointer, select } from 'd3';
import { useEffect, useMemo, useRef, useState } from 'react'

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
    scale: ScaleLinear<number, number, never>
    transform: string
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

const getTransformedDataArr = (data:number[]):[number, number][] => {
    let transformedArr:[number, number][] = []

    let index = 0
    let sum = 0
    for (let i = 0; i < data.length; i++) {
        sum += data[i]
        if (((i+1) % 4) == 0) {
            transformedArr.push([index++, sum])
            sum = 0
        }
    }
    return transformedArr
}

export const LineChart = ({width, height, data}: DesnityChartProps) => {
    /* For tooltip */ 
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [hoveredPlays, setHoveredPlays] = useState<number>(0)
    const [mouseLocation, setMouseLocation] = useState<MouseData>({
        x: 0,
        y: 0
    })

    const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };
    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;

    const density:[number, number][] = getTransformedDataArr(data)

    const xScale = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([0, 13]) // note: limiting to 1000 instead of max here because of extreme values in the dataset
            .range([10, width - 10]);
    }, [data, width]);

    const yScale = useMemo(() => {
        const max = Math.max(...density.map((d) => d[1]));
        return d3.scaleLinear().range([height, 10]).domain([0, max]);
    }, [data, height]);

    const path = useMemo(() => {
        const lineGenerator = d3
          .line()
          .x((d) => xScale(d[0]))
          .y((d) => yScale(d[1]))
        return lineGenerator(density);
    }, [density]) as string;

    const allCircles = density.map((item, i) => {
        return (
          <circle
            key={i}
            cx={xScale(item[0])}
            cy={yScale(item[1])}
            r={4}
            fill={'red'}
            onMouseOver={() => {
                setHoveredPlays(item[1])
                setIsHovered(true)
            }}
            onMouseMove={(e) => {
                setMouseLocation({
                    x: pointer(e)[0],
                    y: pointer(e)[1]
                })
            }}
            onMouseOut={() => {
                setIsHovered(false)
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
                    <path
                        d={path}
                        opacity={0.6}
                        stroke="red"
                        fill="none"
                        strokeWidth={2}
                    />
                    {allCircles}
                </g>
            </svg>
        </div>
    )
}