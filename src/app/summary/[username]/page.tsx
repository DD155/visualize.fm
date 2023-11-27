'use client'

import { ReactElement, useState } from "react"

const Summary = () => {
    const [currentPage, setCurrentPage] = useState<number>(0)

    const clickForwardPage = () => {
        currentPage < 4 && setCurrentPage(currentPage + 1)
    }

    const renderPage = (page:number): ReactElement | null => {
        switch (page) {
            case 0: 
                return (
                    <p className='text-2xl'>
                    Grid Item 1
                    </p>
                )
            case 1: 
                return (
                    <p className='text-2xl'>
                    Grid Item 2
                    </p>
                )
            case 2: 
                return (
                    <p className='text-2xl'>
                    Grid Item 3
                    </p>
                )
            case 3: 
                return (
                    <p className='text-2xl'>
                    Grid Item 4
                    </p>
                )
            case 4: 
                return (
                    <p className='text-2xl'>
                    Grid Item 5
                    </p>
                )
                
            default: return <></>
        }
    }

    return (
        <div className='grid h-screen grid-cols-7 grid-rows-7'>
            {/* Left side for previous button */}
            <div className = 'flex items-center justify-center border-solid border-2 border-white row-start-1 row-end-7 text-white'>
                <button onClick = {() => currentPage > 0 && setCurrentPage(currentPage - 1)}> Previous </button>
            </div>
            
            {/* Actual content goes here */}
            <div className = 'border-solid border-2 border-white col-start-2 col-end-7 row-start-1 row-end-7 text-white p-10'>
                {renderPage(currentPage)}
            </div>
            
            {/* Left side for next button */}
            <div className = 'flex items-center justify-center border-solid border-2 border-white row-start-1 row-end-7 text-white'>
            <button onClick = {() => currentPage < 4 && setCurrentPage(currentPage + 1)}> Next </button>
            </div>
            
            {/* Bottom side for page navigation */}
            <div className = 'border-solid border-2 border-white col-start-2 col-end-7 row-start-6 row-end-7 text-white'>
                <div className='pl-72 pr-72 grid grid-cols-5 h-full justify-center'>
                    <button onClick = {() => setCurrentPage(0)} className='border-solid border-2 border-red-900'> Page 1 </button>
                    <button onClick = {() => setCurrentPage(1)}> Page 2 </button>
                    <button onClick = {() => setCurrentPage(2)}> Page 3 </button>
                    <button onClick = {() => setCurrentPage(3)}> Page 4 </button>
                    <button onClick = {() => setCurrentPage(4)}> Page 5 </button>
                </div>
            </div>
        </div>
    )
}

export default Summary