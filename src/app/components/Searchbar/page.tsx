'use client'

import { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'

const Searchbar = () => {
    const router = useRouter()
    const [username, setUsername] = useState<string>("")
    const [isValidUsername, setIsValidUsername] = useState<boolean>(true)

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const searchOnclick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (username.length > 1 && username.length < 16)
            router.push(`/visualize?username=${username}`)  // pass the username as a query
        else
            setIsValidUsername(false)
    }

    return (
        <>
            <div className='h-12 w-1/3'>
                <form onSubmit={searchOnclick} className='h-full w-full flex flex-row m-auto border-solid border-0 rounded-lg p-[2px] focus-within:outline outline-2 outline-main-red'>
                    <input className='p-2 w-full h-full grow-2 rounded-l-lg focus:outline-none' 
                        type='text' placeholder="Enter a username..."  onChange={inputHandler}/>
                    
                    
                    <button 
                        type='submit'
                        className='m-auto bg-no-repeat bg-center bg-[url("/search.svg")] hover:bg-red-800 p-2 text-s w-1/6 h-full bg-main-red text-white rounded-r-lg'> 
                         
                    </button>
                    
                    {/*
                    <input 
                        type='image'
                        className='bg-white bg-[url("/next.svg")] bg-cover w-8 h-full' alt=''> 
                        
                    </input>
                    */}
                </form>
                { 
                !isValidUsername &&
                    <div className='mt-4'>
                        <span className='text-main-red'>Please enter the username again.</span>   
                    </div>
                }
            </div>
            
            
        </>
    )
}

export default Searchbar