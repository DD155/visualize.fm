import useSWRImmutable from "swr/immutable"
import { fetcher } from "../Utils"

interface GenreAreaType {
    data: any[]
}

export const GenreArea = ({data}: GenreAreaType) => {
    const artist = "Cher"
    const { data: artistData, error, isLoading } = useSWRImmutable(`/api/artists/getTopTags/${artist}`, fetcher, {
        onErrorRetry: (err) => {
            if (err.status === 500) 
                return
        }
    })

    if (artistData) {
        console.log(artistData)

        return (
            <>
            </>
        )
    }
}

//export default PageButton