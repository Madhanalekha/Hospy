
const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <div className='flex min-h-[220px] w-full items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 px-6 py-8 text-center text-gray-600 md:max-w-[360px]'>
          <div>
            <p className='text-xl font-semibold text-gray-700'>Visit our office</p>
            <p className='mt-3 text-sm'>We are here to help you schedule care and answer questions about our services.</p>
          </div>
        </div>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className=' font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p className=' text-gray-500'>54709 Willms Station <br /> Suite 350, Washington, USA</p>
          <p className=' text-gray-500'>Tel: (415) 555-0132 <br /> Email: greatstackdev@gmail.com</p>
          <p className=' font-semibold text-lg text-gray-600'>CAREERS AT HOSPY</p>
          <p className=' text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>

    </div>
  )
}

export default Contact

