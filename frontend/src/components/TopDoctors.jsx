import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const TopDoctors = () => {

    const navigate = useNavigate()

    const { doctors } = useContext(AppContext)

    const getInitials = (name = 'D') => {
        const words = name.trim().split(/\s+/).slice(0, 2)
        return words.map((word) => word[0]).join('').toUpperCase()
    }

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
            <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                        <div className='flex h-44 flex-col justify-between bg-[#EAEFFF] p-4'>
                            <div className='flex items-start justify-between gap-2'>
                                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-semibold text-primary shadow-sm'>
                                    {getInitials(item.name)}
                                </div>
                                <div className='text-right'>
                                    <p className='text-[11px] uppercase tracking-wide text-gray-500'>Fee</p>
                                    <p className='text-sm font-semibold text-primary'>₹{item.fees || 0}</p>
                                </div>
                            </div>
                            <div className='space-y-1 text-sm text-gray-600'>
                                <p className='text-xs uppercase tracking-wide text-gray-500'>{item.speciality || 'Specialist'}</p>
                                <p className='text-base font-semibold text-[#262626]'>{item.name}</p>
                                <p>{item.degree || 'MBBS'}</p>
                                <p>{item.experience || 'Experienced doctor'}</p>
                                <p className='line-clamp-2 text-gray-500'>{item.about || item.description || 'Dedicated to providing quality care.'}</p>
                            </div>
                        </div>
                        <div className='p-4'>
                            <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                                <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10'>more</button>
        </div>

    )
}

export default TopDoctors
