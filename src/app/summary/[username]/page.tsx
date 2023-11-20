const Summary = () => {


    return (
        <div className='grid h-screen grid-cols-7 grid-rows-7'>
            {/* Left side for previous button */}
            <div className = 'flex items-center justify-center border-solid border-2 border-white row-start-1 row-end-7 text-white'>
                <button> Previous </button>
            </div>
            
            {/* Actual content goes here */}
            <div className = 'border-solid border-2 border-white col-start-2 col-end-7 row-start-1 row-end-7 text-white p-10'>
                <p className='text-2xl'>
                    Grid Item 2
                </p>
            </div>
            
            {/* Left side for next button */}
            <div className = 'flex items-center justify-center border-solid border-2 border-white row-start-1 row-end-7 text-white'>
            <button> Next </button>
            </div>
            
            {/* Bottom side for page navigation */}
            <div className = 'border-solid border-2 border-white col-start-2 col-end-7 row-start-6 row-end-7 text-white'>
                <div className='pl-72 pr-72 grid grid-cols-5 h-full justify-center'>
                    <button className='border-solid border-2 border-red-900'> Page 1 </button>
                    <button> Page 2 </button>
                    <button> Page 3 </button>
                    <button> Page 4 </button>
                    <button> Page 5 </button>
                </div>
            </div>
        </div>
    )
}

export default Summary