import { fetcher } from "Utils" 
import useSWRImmutable from "swr/immutable"

interface ArtistsAreaProps {
    username: string,
    timeframe: string
}

export const ArtistsArea = ({username, timeframe} : ArtistsAreaProps) => {
    const { data: userInfoData, error, isLoading } = useSWRImmutable(`/api/users/getTopArtists/${username}/period=${timeframe}`, fetcher, {
        onErrorRetry: (err) => {
            if (err.status === 500) 
                return
        }
    })

    if (!isLoading)
        console.log(userInfoData)

    return (
        <div>

        </div>
    )
}