import { BarChart } from "./Charts/BarChart"
import { useState } from "react"

interface ArtistsAreaProps {
    height: number,
    width: number
    data: any[]
}

interface TimeframeIndex {
    [key: string]: number
}

export const ArtistsArea = ({height, width, data} : ArtistsAreaProps) => {
    const [currentTimeframe, setCurrentTimeframe] = useState<string>("7day")
    const indexFromTimeframe: TimeframeIndex = { // used to index the data array based off seleccted timeframe
        "7day": 0,
        "1month": 1,
        "12month": 2,
        "overall": 3
    } 

    const getTimeframeButtonStyle = (timeframe:string) => {
        return currentTimeframe === timeframe 
            ? 'p-1 border-solid border-2 text-black bg-white'  
            : 'p-1 border-solid border-2 text-white bg-slate-950' 
    } 


    // if (isLoading) {
    //     // safelisted classes
    //     const widthStyle = `w-[${width}px]`
    //     const heightStyle = `h-[${height}px]`

    //     return (
    //     <div className={`${heightStyle} ${widthStyle} flex justify-center items-center`}>
    //         <div className='border-solid border-2 rounded-lg p-5'>
    //             <span className='flex items-center justify-center mb-3'> Top Artists </span>
    //             <div className='flex items-center justify-center text-xs'> 
    //                 <div>
    //                     <button onClick={() => setCurrentTimeframe('7day')} className={getTimeframeButtonStyle('7day') + ' rounded-l-md'}>Week</button>
    //                     <button onClick={() => setCurrentTimeframe('1month')} className={getTimeframeButtonStyle('1month')}>Month</button>
    //                     <button onClick={() => setCurrentTimeframe('12month')} className={getTimeframeButtonStyle('12month')}>Year</button>
    //                     <button onClick={() => setCurrentTimeframe('overall')} className={getTimeframeButtonStyle('overall') + ' rounded-r-md'}>Overall</button>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //     )    
    // }

    if (data) {
        const artistsArr = data[indexFromTimeframe[currentTimeframe]]

        return (
            <div className='border-solid border-2 rounded-lg p-5'>
                <span className='flex items-center justify-center mb-3'>Top Artists</span>
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