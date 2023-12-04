'use client'

import { PageButton } from "@components/PageButton/page"
import React from "react"
import { ReactElement, useState } from "react"

const Summary = () => {
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [currentTimeframe, setCurrentTimeframe] = useState<string>("week")

    const NUM_PAGES = 5
    const pgArr:number[] = Array.from({length: NUM_PAGES}, (_, i) => i) // create an array of size NUM_PAGES, from 1 to 5

    // display content depending on the current page
    const renderPage = (page:number): ReactElement | null => {
        switch (page) {
            case 0: 
                return (
                    <p className='text-2xl'>
                    As of this 
                    <select className='m-2 text-main-red bg-transparent border-0 border-b-2 border-main-red focus:outline-none focus:ring-0' value={currentTimeframe} onChange={e => setCurrentTimeframe(e.target.value)}>
                        <option className='text-black' value='week'>Week</option>
                        <option className='text-black' value='month'>Month</option>
                        <option className='text-black' value='year'>Year</option>
                    </select>
                    {/*<span className='underline underline-offset-6 cursor-pointer' >{currentTimeframe}</span>*/}
                    <br />
                    
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
            <div className = 'flex items-center justify-center row-start-1 row-end-7 text-white'>   
                {  currentPage !== 0 && <button className='bg-no-repeat bg-center bg-[url("/previous.svg")] w-1/4 h-1/6' onClick = {() => currentPage > 0 && setCurrentPage(currentPage - 1)}> </button> }
            </div>
            
            {/* Actual content goes here */}
            <div className = 'border-solid border-2 border-white col-start-2 col-end-7 row-start-1 row-end-6 text-white p-10'>
                {renderPage(currentPage)}
            </div>
            
            {/* Left side for next button */}
            <div className = 'flex items-center justify-center row-start-1 row-end-7 text-white'>
                { currentPage !== NUM_PAGES-1 && <button className='bg-no-repeat bg-center bg-[url("/forward.svg")] w-1/4 h-1/6' onClick = {() => currentPage < 4 && setCurrentPage(currentPage + 1)}></button> }
            </div>
            
            {/* Bottom side for page navigation */}
            <div className = 'col-start-2 col-end-7 row-start-6 row-end-7 text-white'>
                <div className='pl-72 pr-72 grid grid-cols-5 h-full justify-center'>
                    { /* Create the page buttons dynamically */
                    pgArr.map(i => 
                        <PageButton key={i} onClickFunction={() => setCurrentPage(i)} selectedPage={currentPage} current={i}/>
                    ) } 
                </div>
            </div>
        </div>
    )
}

export default Summary