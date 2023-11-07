'use client'

import { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'

const Searchbar = () => {
    const router = useRouter()
    const [username, setUsername] = useState<string>("")

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const searchOnclick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (username.length > 0)
            router.push(`/visualize?username=${username}`)  // pass the username as a query
    }

    return (
        <>
            <div className='h-12'>
                <form onSubmit={searchOnclick} className='h-full flex flex-row p-1 justify-center'>
                    <input className='p-2 w-1/4 h-full' 
                        type='text' placeholder="Enter a username..."  onChange={inputHandler}/>
                    
                    <button 
                        type='submit'
                        className='hover:bg-red-700 p-2 text-s h-full bg-main-red text-white'> 
                        Search 
                    </button>
                    
                    {/*
                    <input 
                        type='image'
                        className='bg-white bg-[url("/next.svg")] bg-cover w-8 h-full' alt=''> 
                        
                    </input>
                    */}
                </form>
            </div>
            
        </>
    )
}

export default Searchbar