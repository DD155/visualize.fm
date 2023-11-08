import { NextResponse } from "next/server"

const API_KEY = process.env.API_KEY as string
const url = process.env.NEXT_PUBLIC_API_URL // https://ws.audioscrobbler.com/2.0/
// https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=rj&api_key=YOUR_API_KEY&format=json

export const GET = async (request:Request) => {
    const lastIndexOfSlash = request.url.lastIndexOf('/') // Last slash is query for username
    const secondToLastSlash = request.url.lastIndexOf('/', lastIndexOfSlash-1) // Second to last slash is for method

    const method = request.url.slice(secondToLastSlash + 1, lastIndexOfSlash) // Get the API method from the url  
    const username = request.url.slice(request.url.lastIndexOf('/') + 1) // Get the username from the url  

    try {
        const res = await fetch(`${url}?method=user.${method}&user=${username}&api_key=${API_KEY}&format=json`)
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