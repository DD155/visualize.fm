import Image from 'next/image'
import Searchbar from '@components/Searchbar/page'

export default function Home() {
  return (
    <>
        <div className='h-screen mt-8 bg-slate-950'>
            <div className='text-center'>
                <span className='text-6xl text-white'> visualize.</span><span className = 'text-6xl text-red-800'>fm</span>
            </div>
            <div className='mt-36 text-center'>
                <Searchbar />
            </div>
        </div>
    </>
  )
}
