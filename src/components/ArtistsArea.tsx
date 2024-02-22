import { BarChart } from "./Charts/BarChart"
import { fetchers } from "../Utils" 
import { useState } from "react"
import useSWR from "swr"

interface ArtistsAreaProps {
    username: string,
    height: number,
    width: number
}

interface TimeframeIndex {
    [key: string]: number
}

export const ArtistsArea = ({username, height, width} : ArtistsAreaProps) => {
    const [currentTimeframe, setCurrentTimeframe] = useState<string>("7day")
    const indexFromTimeframe: TimeframeIndex = { // used to index the data array based off seleccted timeframe
        "7day": 0,
        "1month": 1,
        "12month": 2,
        "overall": 3
    } 

    const useMultipleRequests = (urls: string[]) =>  {
        const { data, error } = useSWR(urls, fetchers)
        return {
          data: data,
          isError: !!error,
          isLoading: !data && !error
        }
    }

    const urls:string[] = [
        `/api/users/getTopArtists/${username}/period=7day`,
        `/api/users/getTopArtists/${username}/period=1month`,
        `/api/users/getTopArtists/${username}/period=12month`,
        `/api/users/getTopArtists/${username}/period=overall`,
    ]

    const { data, isError, isLoading } = useMultipleRequests(urls)

    const getTimeframeButtonStyle = (timeframe:string) => {
        return currentTimeframe === timeframe 
            ? 'p-1 border-solid border-2 text-black bg-white'  
            : 'p-1 border-solid border-2 text-white bg-slate-950' 
    } 


    if (isLoading) {
        // safelisted classes
        const widthStyle = `w-[${width}px]`
        const heightStyle = `h-[${height}px]`

        return (
        <div className={`${heightStyle} ${widthStyle} flex justify-center items-center`}>
            <div className='border-solid border-2 rounded-lg p-5'>
                <span className='flex items-center justify-center mb-3'> Top Artists </span>
                <div className='flex items-center justify-center text-xs'> 
                    <div>
                        <button onClick={() => setCurrentTimeframe('7day')} className={getTimeframeButtonStyle('7day') + ' rounded-l-md'}>Week</button>
                        <button onClick={() => setCurrentTimeframe('1month')} className={getTimeframeButtonStyle('1month')}>Month</button>
                        <button onClick={() => setCurrentTimeframe('12month')} className={getTimeframeButtonStyle('12month')}>Year</button>
                        <button onClick={() => setCurrentTimeframe('overall')} className={getTimeframeButtonStyle('overall') + ' rounded-r-md'}>Overall</button>
                    </div>
                </div>
            </div>
        </div>
        )    
    }

    if (!isLoading && data) {
        const artistsArr = data[indexFromTimeframe[currentTimeframe]].topartists.artist
        return (
            <div className='border-solid border-2 rounded-lg p-5'>
                <span className='flex items-center justify-center mb-3'> Top Artists </span>
                <div className='flex items-center justify-center text-xs'> 
                    <div>
                        <button onClick={() => setCurrentTimeframe('7day')} className={getTimeframeButtonStyle('7day') + ' rounded-l-md'}>Week</button>
                        <button onClick={() => setCurrentTimeframe('1month')} className={getTimeframeButtonStyle('1month')}>Month</button>
                        <button onClick={() => setCurrentTimeframe('12month')} className={getTimeframeButtonStyle('12month')}>Year</button>
                        <button onClick={() => setCurrentTimeframe('overall')} className={getTimeframeButtonStyle('overall') + ' rounded-r-md'}>Overall</button>
                    </div>
                </div>
                <BarChart height={height} time={currentTimeframe} width={width} data={artistsArr.slice(0, 10)} />
            </div>
        )
        
    }
}