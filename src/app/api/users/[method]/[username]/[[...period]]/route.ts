import { NextResponse } from "next/server"

const API_KEY = process.env.API_KEY as string
const url = process.env.NEXT_PUBLIC_API_URL // https://ws.audioscrobbler.com/2.0/
// https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=rj&api_key=YOUR_API_KEY&format=json

// number of slashs present in url (API, USERNAME by default)
const DEFAULT_PARAMS_LENGTH = 2

const getRequestsFromURL = (url:string) => {
    const slashArray = url.split("/")

    let requests = []
    for (let i = slashArray.length-1; i > 0; i--) {
        if (slashArray[i] === "users") break
        requests.push(slashArray[i])
    }
    requests.reverse()

    return requests
}

export const GET = async (request:Request) => { 
    // const slashArray = request.url.split("/")

    // let requests = []
    // for (let i = slashArray.length-1; i > 0; i--) {
    //     if (slashArray[i] === "users") break
    //     requests.push(slashArray[i])
    // }
    // requests.reverse()
    const requests = getRequestsFromURL(request.url)

    try {
        const requestUrl = (requests.length > 2) 
            ? `${url}?method=user.${requests[0]}&user=${requests[1]}&${requests[2]}&api_key=${API_KEY}&format=json`
            : `${url}?method=user.${requests[0]}&user=${requests[1]}&api_key=${API_KEY}&format=json`
            

        const res = await fetch(requestUrl)
        const data = await res.json()
        if (!("error" in data))
            return NextResponse.json(data)
        else 
            throw Error 
    } catch (error) {
        return new Response(null, {
            status: 500,
            statusText: 'User API request has failed'
        })
    }
    //return data ? NextResponse.json(data) : NextResponse.json({"message": "User API request has failed"})
}