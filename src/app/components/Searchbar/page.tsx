'use client'

import { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'

const Searchbar = () => {
    const router = useRouter()
    const [username, setUsername] = useState<string>("")

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const searchOnclick = () => {
        router.push(`/visualize?username=${username}`)  // pass the username as a query
    }

    return (
        <>
            <div className='h-12'>
                <input className='p-2 w-1/4 h-full' 
                    type='text' placeholder="Enter a username..."  onChange={inputHandler}/>
                <button 
                    className='hover:bg-red p-2 text-s h-full bg-main-red text-white'
                    onClick={searchOnclick}> Search 
                </button>
            </div>
            
        </>
    )
}

export default Searchbar