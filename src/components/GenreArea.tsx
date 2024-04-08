import useSWRImmutable from "swr/immutable"
import { fetcher, fetchers } from "../Utils"
import useSWR from "swr"
import { useState } from "react"
import { PieChart } from "./Charts/PieChart"

interface GenreAreaType {
    data: any[]
    width: number,
    height: number
}

export const GenreArea = ( {width, height, data}: GenreAreaType) => {
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

    const artist = "Hante."
    const NUM_ARTISTS = 25
 
    const getUrlsFromData = ():string[] => {
        let urls = []

        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[0].length; j++) {
                urls.push(`/api/artists/getTopTags/${data[i][j].name}`)
            }
        }
        return urls
    }
    const URLS:string[] = getUrlsFromData() 

    const useMultipleRequests = (urls: string[]) =>  {
        const { data, error } = useSWR(urls, fetchers)
        return {
          data: data,
          isError: !!error,
          isLoading: !data && !error
        }
    }
    const { data: artistData, isError, isLoading } = useMultipleRequests(URLS)

    if (!isLoading && artistData) {
        const flattenedData = data.flat() // flatten original 2d arr to be parsed in one pass

        // transform data from api request to maps (key: genre, value: number of appearances) by timeframe
        const getPopulatedGenreMaps = (): Map<string,number>[] => {
            let mapsIndex:number = 0
            let count:number = 0
            let maps:Map<string, number>[] = [new Map(), new Map(), new Map(), new Map()]

            for (let i in artistData) {
                if (artistData[i].toptags.tag.length === 0) continue // this means the artist has no tags so skip to next one

                count++ // keep a separate index from i to not run into 0 with modulo issue

                const currentGenre:string = artistData[i].toptags.tag[0].name
                const currentMap = maps[mapsIndex]
                const genrePlayCount = parseInt(flattenedData[i].playcount)

                const currentElement = currentMap.get(currentGenre) // null check and update value in map 
                currentElement ? 
                    currentMap.set(currentGenre, (currentElement + (genrePlayCount))) : 
                    currentMap.set(currentGenre, genrePlayCount)
                
                if (count % NUM_ARTISTS == 0) // update map index as to not go out of bounds
                    mapsIndex++
            }
            return maps
        }
        
        const maps = getPopulatedGenreMaps()
        const genreArr = []


        for (const [key, value] of maps[indexFromTimeframe[currentTimeframe]]) {
            let obj = {name: key, playcount: value}
            genreArr.push(obj)
        }
        //console.log(maps)

        return (
            <>
                <div className='border-solid border-2 rounded-lg p-5'>
                    <span className='flex items-center justify-center mb-3'>Top Genres</span>
                    <div className='flex items-center justify-center text-xs'> 
                        <div>
                            <button onClick={() => setCurrentTimeframe('7day')} className={getTimeframeButtonStyle('7day') + ' rounded-l-md'}>Week</button>
                            <button onClick={() => setCurrentTimeframe('1month')} className={getTimeframeButtonStyle('1month')}>Month</button>
                            <button onClick={() => setCurrentTimeframe('12month')} className={getTimeframeButtonStyle('12month')}>Year</button>
                            <button onClick={() => setCurrentTimeframe('overall')} className={getTimeframeButtonStyle('overall') + ' rounded-r-md'}>Overall</button>
                        </div>
                    </div>
                    <PieChart width={width} height={height} time={currentTimeframe} data={genreArr} />
                </div>
            </>
        )
    }
}

//export default PageButton