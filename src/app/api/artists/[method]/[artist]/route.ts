import { getRequestsFromURL } from "../../../../../Utils"
import { NextResponse } from "next/server"

const API_KEY = process.env.API_KEY as string
const url = process.env.NEXT_PUBLIC_API_URL as string // https://ws.audioscrobbler.com/2.0/
// /2.0/?method=artist.METHOD_NAME&artist=ARTIST_NAME&api_key=YOUR_API_KEY&format=json 

export const GET = async (request:Request) => { 
    const requests = getRequestsFromURL(request.url, "artists")

    try {
        const requestUrl = `${url}?method=artist.${requests[0]}&artist=${requests[1]}&api_key=${API_KEY}&format=json`
            
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
}