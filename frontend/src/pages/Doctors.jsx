import { useCallback, useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {

  const { speciality } = useParams()

  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext)

  const getInitials = (name = 'D') => {
    const words = name.trim().split(/\s+/).slice(0, 2)
    return words.map((word) => word[0]).join('').toUpperCase()
  }

  const applyFilter = useCallback(() => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }, [doctors, speciality])

  useEffect(() => {
    applyFilter()
  }, [applyFilter])

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button onClick={() => setShowFilter(!showFilter)} className={`py-1 px-3 border rounded text-sm  transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'General physician' ? 'bg-[#E2E5FF] text-black ' : ''}`}>General physician</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gynecologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Gynecologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Dermatologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Dermatologist</p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pediatricians' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Pediatricians</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Neurologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Neurologist</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterDoc.map((item, index) => (
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
                  <p>{item.address?.line1 || item.address?.city || 'Available for consultation'}</p>
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
      </div>
    </div>
  )
}

export default Doctors
