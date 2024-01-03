import { getRequestsFromURL } from "Utils"
import { NextResponse } from "next/server"

const API_KEY = process.env.API_KEY as string
const url = process.env.NEXT_PUBLIC_API_URL as string // https://ws.audioscrobbler.com/2.0/
// https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=rj&api_key=YOUR_API_KEY&format=json

export const GET = async (request:Request) => { 
    const requests = getRequestsFromURL(request.url, "users")

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
}