'use client'

import { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'

const Searchbar = () => {
    const router = useRouter()
    const [username, setUsername] = useState<string>("")

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
        console.log(username)
    }

    const searchOnclick = () => {
        router.push(`/visualize?username=${username}`) 
    }

    return (
        <>
            <input type='text' placeholder= "Enter a username..."  onChange={inputHandler}/>
            <button onClick = {searchOnclick}> Search </button>
        </>
    )
}

export default Searchbar