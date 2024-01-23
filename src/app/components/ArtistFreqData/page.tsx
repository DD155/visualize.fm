import { fetcher } from "Utils"
import useSWR from "swr"

interface ArtistDataProps {
    username: string,
    artist: string,
    from: string,
    to: string
}

export const ArtistFreqData = ({username, artist, from, to} : ArtistDataProps) => {
    const { data: userInfoData, error, isLoading } = useSWR(`/api/users/getWeeklyArtistChart/${username}/${from}/${to}`, fetcher, {
        onErrorRetry: (err) => {
            if (err.status === 500) 
                return
        }
    })

    if (!isLoading) {
        const arr:ArtistData[] = userInfoData.weeklyartistchart.artist
        let arrayMap = Object.create(null) // create a map for indexing the artist to avoid searching through an array
        arr.forEach(el => {arrayMap[el.name] = el})

        if (arrayMap[artist]) {
            const plays = arrayMap[artist].playcount
            console.log(plays)
        }

        // Once the chart is created, this will return a data point to be used
        return (
            <div>
                
            </div>
        )
    }
}