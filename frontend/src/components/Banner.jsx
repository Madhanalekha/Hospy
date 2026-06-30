import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <div className='flex bg-primary rounded-lg  px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>

            {/* ------- Left Side ------- */}
            <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
                    <p>Book Appointment</p>
                    <p className='mt-4'>With 100+ Trusted Doctors</p>
                </div>
                <button onClick={() => { navigate('/login'); scrollTo(0, 0) }} className='bg-white text-sm sm:text-base text-[#595959] px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all '>Create account</button>
            </div>

            {/* ------- Right Side ------- */}
            <div className='hidden md:flex md:w-1/2 lg:w-[370px] items-center justify-center'>
                <div className='rounded-2xl border border-white/30 bg-white/10 px-6 py-5 text-white backdrop-blur-sm'>
                    <p className='text-lg font-semibold'>Fast, simple booking</p>
                    <p className='mt-2 text-sm text-white/90'>Browse trusted doctors, pick a slot, and keep your care plan on track.</p>
                </div>
            </div>
        </div>
    )
}

export default Banner
