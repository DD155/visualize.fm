import { ArtistFreqData } from "@components/ArtistFreqData/page"
import { fetcher } from "Utils"
import { useEffect, useState } from "react"
import useSWR from "swr"

interface ArtistHistogramProps {
    username: string,
    artist: string
}

export const ArtistFreqHistogram = ({username, artist} : ArtistHistogramProps) => {
    const [chartArr, setChartArr] = useState<WeeklyChartData[]>([])

    const { data: userInfoData, error, isLoading } = useSWR(`/api/users/getWeeklyChartList/${username}`, fetcher, {
        onErrorRetry: (err) => {
            if (err.status === 500) 
                return
        }
    })

    // useEffect(() => {
    //     console.log(userInfoData, error)
    //     if(userInfoData) {
    //         const charts = userInfoData.weeklychartlist.chart
    //         //console.log(charts[charts.length-1])
    //         setChartArr(charts)
    //     }
    // }, [userInfoData])

    if (isLoading) {
        return (
            <div>
                Hi
            </div>
        )
    }

    if (!isLoading) {
        const charts = userInfoData.weeklychartlist.chart
        const chart = charts[charts.length-1]
        // Create the chart here. X axis = Date Y axis = Plays.
        // The actual data will be a map of components onto the chart one point at a time
        
        // Renders the data points by going from most recent week backwards
        const renderData = (amount:number) => {
            let id = 0
            return (
                <>
                    {charts.slice(amount*-1).map((x:any) => (
                        <ArtistFreqData key={id++} username={username} artist={artist} to={x.to} from={x.from}/>)
                    )}
                </>
            )
        }

        return (
            <div>
                {renderData(5)}
            </div>
        )
    }
}