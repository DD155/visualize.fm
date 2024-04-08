import * as d3 from "d3"
import { useMemo } from "react"

interface PieChartProps {
    data: GenreData[] // genre name, playcount
    time: string
    height: number
    width: number
    
}

export const PieChart = ({ time, data, width, height }: PieChartProps) => {
    const MARGIN = 10
    const radius = Math.min(width, height) / 2 - MARGIN

    const pie = useMemo(() => {
    const pieGenerator = d3.pie<any, GenreData>().value((d) => d.playcount)
        return pieGenerator(data)
    }, [data])

    const arcPaths:string[] = useMemo(() => {
            const arcPathGenerator = d3.arc()
            return pie.map((p) =>
            arcPathGenerator({
            innerRadius: 0,
            outerRadius: radius,
            startAngle: p.startAngle,
            endAngle: p.endAngle,
            }) as string
        )
    }, [radius, pie]);
   
    console.log(data, pie, arcPaths)

    return (
        <div>
            <svg width={width} height={height} style={{ display: "inline-block" }}>
                <g transform={`translate(${width / 2}, ${height / 2})`}>
                    {/* { arcPaths.map((arc, i) => {
                        return <path key={i} d={arc} fill={colors[i]} />;
                    })} */}
                </g>
            </svg>
        </div>
    )
}