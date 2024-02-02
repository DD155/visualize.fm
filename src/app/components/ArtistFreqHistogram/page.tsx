import { ArtistFreqData } from "@components/ArtistFreqData/page"
import { LineChart } from "@components/LineChart/page"
import { fetcher } from "Utils"
import { useEffect, useState } from "react"
import useSWR from "swr"

interface ArtistHistogramProps {
    username: string,
    artist: string
    width: number,
    height: number,
}

export const ArtistFreqHistogram = ({width, height, username, artist} : ArtistHistogramProps) => {
    const COUNT = 52

    const { data: userInfoData, error, isLoading } = useSWR(`/api/users/getWeeklyChartList/${username}`, fetcher, {
        onErrorRetry: (err) => {
            if (err.status === 500) 
                return
        }
    })
    

    if (isLoading) {
        // safelisted classes
        const widthStyle = `w-[${width}px]`
        const heightStyle = `h-[${height}px]`

        return (
        <div className={`${heightStyle} ${widthStyle} flex justify-center items-center`}>
            <svg className="animate-spin ml-3 mr-3 h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
        )    
    }

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