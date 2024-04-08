// for bar chart
interface ArtistData {
    name: string,
    playcount: number
}

interface GenreData {
    name: string,
    playcount: number
}

interface WeeklyChartData {
    to: string,
    from: string,
    //'#text': string
}

interface TimeframeIndex {
    [key: string]: number
}