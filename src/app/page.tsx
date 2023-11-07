import Image from 'next/image'
import Searchbar from '@components/Searchbar/page'

export default function Home() {
  return (
    <>
        <div className='mt-28'>
            <div className='text-center'>
                <span className='text-6xl text-white'> visualize.</span><span className = 'text-6xl text-main-red'>fm</span>
            </div>
            <div className='flex justify-center mt-24 text-center'>
                <Searchbar />
            </div>
        </div>
    </>
  )
}
