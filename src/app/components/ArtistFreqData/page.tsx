import { fetchers } from "Utils"
import { useEffect } from "react"
import useSWR from "swr"


interface ArtistDataProps {
    username: string,
    artist: string,
    timeframes: number[],
    count: number
}

export const ArtistFreqData = ({timeframes, count, username, artist} : ArtistDataProps) => {  
    const generateURLS = (count: number) => {
        let arr: string[] = []

        timeframes.slice(count*-1).map((x:any) => {
            const URL = `/api/users/getWeeklyArtistChart/${username}/${x.from}/${x.to}`
            arr.push(URL)
        })
        return arr
    }

    const useMultipleRequests = (urls: string[]) =>  {
        const { data, error } = useSWR(urls, fetchers)
        return {
          data: data,
          isError: !!error,
          isLoading: !data && !error
        }
    }

    const { data, isError, isLoading } = useMultipleRequests(generateURLS(count))

    if (!isLoading && data) {
        // Once the chart is created, this will return a data point to be used
        console.log(data) 

        let densityData:number[] = []
        for (let i = 0; i < data.length; i++) {
            const currentData = data[i].weeklyartistchart.artist
            let arrayMap = Object.create(null)
            currentData.forEach((element:any) => {
                arrayMap[element.name] = element
            });

            let plays
            arrayMap[artist] ? plays = parseInt(arrayMap[artist].playcount) : plays = 0   
            densityData.push(plays)
        }
        densityData.reverse()
        console.log(densityData)

        return (
            <></>
        )
    }
}