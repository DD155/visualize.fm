import { LineChart } from "@components/LineChart/page"
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
        // Parse data to be used in LineChart 
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

        return (
            <>
                <LineChart 
                    width={800}
                    height={288}
                    data={densityData}
                />
            </>
        )
    }
}