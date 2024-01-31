import { ArtistFreqData } from "@components/ArtistFreqData/page"
import { LineChart } from "@components/LineChart/page"
import { fetcher } from "Utils"
import { useEffect, useState } from "react"
import useSWR from "swr"

interface ArtistHistogramProps {
    username: string,
    artist: string
}

export const ArtistFreqHistogram = ({username, artist} : ArtistHistogramProps) => {
    const COUNT = 52

    const { data: userInfoData, error, isLoading } = useSWR(`/api/users/getWeeklyChartList/${username}`, fetcher, {
        onErrorRetry: (err) => {
            if (err.status === 500) 
                return
        }
    })

    if (!isLoading) {
        const charts = userInfoData.weeklychartlist.chart

        return (
            <div>
                <ArtistFreqData 
                    username={username} 
                    artist={artist} 
                    timeframes={charts} 
                    count={COUNT}/>
            </div>
        )
    }
}