
const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 '>

            {/* --------- Header Left --------- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
                <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                    Book Appointment <br />  With Trusted Doctors
                </p>
                <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                    <div className='flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/10 text-base font-semibold'>100+</div>
                    <p>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' /> schedule your appointment hassle-free.</p>
                </div>
                <a href='#speciality' className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-[#595959] text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
                    Book appointment
                </a>
            </div>

            {/* --------- Header Right --------- */}
            <div className='md:w-1/2 flex items-center justify-center py-8 md:py-0'>
                <div className='w-full max-w-md rounded-2xl border border-white/30 bg-white/10 p-6 text-white backdrop-blur-sm'>
                    <p className='text-lg font-semibold'>Care that fits your schedule</p>
                    <ul className='mt-4 space-y-2 text-sm text-white/90'>
                        <li>• Same-day appointment options</li>
                        <li>• Clear doctor availability</li>
                        <li>• Simple follow-up booking</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header
