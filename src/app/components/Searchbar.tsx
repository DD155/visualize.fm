'use client'

import { useState } from 'react'

const Searchbar = () => {
    const [username, setUsername] = useState<string>("")


    return (
        <>
            <input type='text' placeholder= "Enter a username..." />
            <button> Search </button>
        </>
    )
}

export default Searchbar