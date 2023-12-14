// Fetcher function to be used with SWR calls
export const fetcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) {
        throw Error("Request unsuccessful")
    }
    const data = await res.json()
    return data
}

// API helper function to be used for parsing the API URL from SWR call for each request/method
export const getRequestsFromURL = (url:string, category:string) => {
    const slashArray = url.split("/")

    let requests = []
    for (let i = slashArray.length-1; i > 0; i--) {
        if (slashArray[i] === category) break // this part of URL is the end of any custom params
        requests.push(slashArray[i])
    }
    requests.reverse()

    return requests
}