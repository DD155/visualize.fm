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

    const switchPageButtonStyle = (pageNumber:number): string => {
        switch (pageNumber) {
            case 0: 
                return 'm-auto bg-no-repeat bg-center bg-[url("/pageNumbers/page1.svg")] w-1/2 h-1/4'
            case 1: 
                return 'm-auto bg-no-repeat bg-center bg-[url("/pageNumbers/page2.svg")] w-1/2 h-1/4'
            case 2: 
                return 'm-auto bg-no-repeat bg-center bg-[url("/pageNumbers/page3.svg")] w-1/2 h-1/4'
            case 3:
                return  ''
        }
        
        
        return ''
    }

    const pageButtonStyle = 'm-auto bg-no-repeat bg-center w-1/2 h-1/3'

    return (
        <div className='grid h-screen grid-cols-7 grid-rows-7'>
            {/* Left side for previous button */}
            <div className = 'flex items-center justify-center row-start-1 row-end-7 text-white'>
                <button className='bg-no-repeat bg-center bg-[url("/previous.svg")] w-1/4 h-1/6' onClick = {() => currentPage > 0 && setCurrentPage(currentPage - 1)}> </button>
            </div>
            
            {/* Actual content goes here */}
            <div className = 'border-solid border-2 border-white col-start-2 col-end-7 row-start-1 row-end-6 text-white p-10'>
                {renderPage(currentPage)}
            </div>
            
            {/* Left side for next button */}
            <div className = 'flex items-center justify-center row-start-1 row-end-7 text-white'>
            <button className='bg-no-repeat bg-center bg-[url("/forward.svg")] w-1/4 h-1/6' onClick = {() => currentPage < 4 && setCurrentPage(currentPage + 1)}></button>
            </div>
            
            {/* Bottom side for page navigation */}
            <div className = 'col-start-2 col-end-7 row-start-6 row-end-7 text-white'>
                <div className='pl-72 pr-72 grid grid-cols-5 h-full justify-center'>
                    <button className={pageButtonStyle + ' bg-[url("/pageNumbers/page1.svg")]'} onClick = {() => setCurrentPage(0)}></button>
                    <button className={pageButtonStyle + ' bg-[url("/pageNumbers/page2.svg")]'} onClick = {() => setCurrentPage(1)}></button>
                    <button className={pageButtonStyle + ' bg-[url("/pageNumbers/page3.svg")]'} onClick = {() => setCurrentPage(2)}></button>
                    <button className={pageButtonStyle + ' bg-[url("/pageNumbers/page4.svg")]'} onClick = {() => setCurrentPage(3)}></button>
                    <button className={pageButtonStyle + ' bg-[url("/pageNumbers/page5.svg")]'} onClick = {() => setCurrentPage(4)}></button>
                </div>
            </div>
        </div>
    )
}

export default Summary