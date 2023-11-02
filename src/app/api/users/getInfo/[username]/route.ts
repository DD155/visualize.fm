import { NextResponse } from "next/server"

const API_KEY = process.env.API_KEY as string
const url = process.env.NEXT_PUBLIC_API_URL // https://ws.audioscrobbler.com/2.0/
// https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=rj&api_key=YOUR_API_KEY&format=json

export const GET = async (request:Request) => {
    const username = request.url.slice(request.url.lastIndexOf('/') + 1) // Get the username from the url query from last slash
    const res = await fetch(`${url}?method=user.getinfo&user=${username}&api_key=${API_KEY}&format=json`)

    const data = await res.json()

    return data ? NextResponse.json(data) : NextResponse.json({"message": "User not found"})
}