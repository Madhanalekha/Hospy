import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const specialityRules = [
    {
        speciality: 'General physician',
        keywords: ['fever', 'cold', 'cough', 'flu', 'fatigue', 'weakness', 'body ache', 'pain', 'checkup', 'infection', 'headache'],
        note: 'A general physician is usually the best first step for common symptoms and an overall health check.'
    },
    {
        speciality: 'Dermatologist',
        keywords: ['skin', 'rash', 'acne', 'itch', 'itching', 'allergy', 'eczema', 'psoriasis', 'hives', 'pigmentation', 'hair fall'],
        note: 'A dermatologist is a good match for skin, hair, and nail concerns.'
    },
    {
        speciality: 'Gynecologist',
        keywords: ['period', 'menstrual', 'pregnancy', 'pcos', 'pregnant', 'pelvic', 'vaginal', 'fertility', 'bleeding', 'women health'],
        note: "A gynecologist is the right specialist for menstrual, pregnancy, and women's reproductive health concerns."
    },
    {
        speciality: 'Pediatricians',
        keywords: ['child', 'baby', 'toddler', 'infant', 'kid', 'children', 'school', 'pediatric'],
        note: 'A pediatrician is the best fit for infants, children, and teen health concerns.'
    },
    {
        speciality: 'Neurologist',
        keywords: ['migraine', 'seizure', 'stroke', 'numbness', 'tingling', 'dizziness', 'memory', 'tremor', 'nerve', 'vertigo'],
        note: 'A neurologist can help with brain, nerve, headache, and seizure-related symptoms.'
    },
    {
        speciality: 'Gastroenterologist',
        keywords: ['stomach', 'abdomen', 'abdominal', 'gas', 'acidity', 'vomiting', 'nausea', 'diarrhea', 'constipation', 'indigestion', 'liver'],
        note: 'A gastroenterologist is the best match for digestive and abdominal concerns.'
    }
]

const emergencyKeywords = [
    'chest pain',
    'difficulty breathing',
    'shortness of breath',
    'breathing trouble',
    'unconscious',
    'seizure',
    'stroke',
    'heavy bleeding',
    'suicidal',
    'self harm',
    'severe allergic',
    'anaphylaxis'
]

const quickPrompts = [
    'I have fever and cough',
    'I have a skin rash and itching',
    'I have stomach pain and vomiting',
    'I have migraine and dizziness',
    'My child has a fever'
]

const normalizeText = (value = '') => value.toLowerCase()

const getSpecialityMatches = (query) => {
    const normalized = normalizeText(query)

    if (!normalized.trim()) {
        return []
    }

    return specialityRules
        .map((rule) => {
            const matchedKeywords = rule.keywords.filter((keyword) => normalized.includes(keyword))
            return {
                ...rule,
                score: matchedKeywords.length
            }
        })
        .filter((rule) => rule.score > 0)
        .sort((a, b) => b.score - a.score)
}

const DoctorSuggestionChatbot = ({ currentDoctor }) => {
    const { doctors } = useContext(AppContext)
    const navigate = useNavigate()

    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'bot',
            kind: 'text',
            text: "Tell me the patient's condition or symptoms, and I will suggest a suitable specialty and nearby doctor options."
        }
    ])

    const suggestCare = (query) => {
        const normalized = normalizeText(query)

        const emergencyMatch = emergencyKeywords.find((keyword) => normalized.includes(keyword))
        if (emergencyMatch) {
            return {
                title: 'Urgent care recommended',
                text: 'These symptoms may need urgent medical attention. Please contact local emergency services or go to the nearest emergency department right away.',
                specialities: [],
                doctors: [],
                urgent: true
            }
        }

        const specialityMatches = getSpecialityMatches(query)
        const topSpecialities = specialityMatches.length > 0
            ? specialityMatches.slice(0, 3)
            : [
                {
                    speciality: 'General physician',
                    note: 'When symptoms are unclear, a general physician is the safest first stop.',
                    score: 0
                }
            ]

        const specialityNames = topSpecialities.map((item) => item.speciality)

        const matchedDoctors = doctors
            .filter((doctor) => specialityNames.includes(doctor.speciality))
            .sort((a, b) => {
                const aAvailable = a.available ? 1 : 0
                const bAvailable = b.available ? 1 : 0
                return bAvailable - aAvailable
            })
            .slice(0, 4)

        const currentDoctorMatch = currentDoctor && specialityNames.includes(currentDoctor.speciality)

        return {
            title: specialityMatches.length > 0 ? 'Suggested specialty' : 'General guidance',
            text: currentDoctorMatch
                ? 'The current doctor looks like a reasonable match for this condition. I also found a few related options below.'
                : `Based on what you described, the best first specialist is ${topSpecialities[0].speciality}.`,
            specialities: topSpecialities,
            doctors: matchedDoctors,
            urgent: false
        }
    }

    const handleSubmit = (overrideQuery) => {
        const query = (overrideQuery ?? input).trim()
        if (!query) {
            return
        }

        const userMessage = {
            id: Date.now(),
            role: 'user',
            kind: 'text',
            text: query
        }

        const reply = suggestCare(query)
        const botMessage = {
            id: Date.now() + 1,
            role: 'bot',
            kind: 'suggestion',
            ...reply
        }

        setMessages((prev) => [...prev, userMessage, botMessage])
        setInput('')
    }

    const resetChat = () => {
        setInput('')
        setMessages([
            {
                id: 1,
                role: 'bot',
                kind: 'text',
                text: "Tell me the patient's condition or symptoms, and I will suggest a suitable specialty and nearby doctor options."
            }
        ])
    }

    const openDoctor = (doctorId) => {
        navigate(`/appointment/${doctorId}`)
        window.scrollTo(0, 0)
    }

    const latestSuggestion = [...messages].reverse().find((message) => message.kind === 'suggestion' && !message.urgent)

    return (
        <div className='mt-8 rounded-2xl border border-[#D9E3FF] bg-gradient-to-br from-white via-[#F8FAFF] to-[#EEF4FF] p-5 shadow-sm'>
            <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
                <div className='max-w-2xl'>
                    <div className='flex items-center gap-3'>
                        <div className='flex h-11 w-11 items-center justify-center rounded-full bg-primary/10'>
                            <img src={assets.chats_icon} alt='' className='h-5 w-5' />
                        </div>
                        <div>
                            <h2 className='text-lg font-semibold text-[#262626]'>Doctor suggestion chatbot</h2>
                            <p className='text-sm text-gray-600'>Describe the patient's symptoms or condition and get a helpful specialty suggestion.</p>
                        </div>
                    </div>
                    <p className='mt-3 text-xs leading-5 text-gray-500'>
                        This tool is for guidance only and does not replace a professional diagnosis. If symptoms are severe or sudden, seek urgent care.
                    </p>
                </div>

                <button onClick={resetChat} className='self-start rounded-full border border-[#D0D9F6] px-4 py-2 text-sm font-medium text-primary transition hover:bg-white'>
                    Reset chat
                </button>
            </div>

            <div className='mt-5 rounded-2xl border border-[#E3E9FB] bg-white p-4'>
                <div className='max-h-[360px] space-y-3 overflow-y-auto pr-1'>
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'bg-primary text-white' : 'bg-[#F4F7FF] text-[#262626]'}`}>
                                {message.kind === 'text' && <p>{message.text}</p>}

                                {message.kind === 'suggestion' && (
                                    <div className='space-y-3'>
                                        <p className='font-medium'>{message.title}</p>
                                        <p className='text-sm'>{message.text}</p>

                                        {!message.urgent && message.specialities.length > 0 && (
                                            <div className='flex flex-wrap gap-2'>
                                                {message.specialities.map((item) => (
                                                    <span key={item.speciality} className='rounded-full bg-white px-3 py-1 text-xs font-medium text-primary shadow-sm'>
                                                        {item.speciality}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {!message.urgent && message.specialities.length > 0 && (
                                            <p className='text-xs text-gray-600'>
                                                {message.specialities[0].note}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className='mt-4 flex flex-wrap gap-2'>
                    {quickPrompts.map((prompt) => (
                        <button
                            key={prompt}
                            onClick={() => handleSubmit(prompt)}
                            className='rounded-full border border-[#D9E3FF] px-3 py-1.5 text-xs text-gray-600 transition hover:border-primary hover:text-primary'
                        >
                            {prompt}
                        </button>
                    ))}
                </div>

                <div className='mt-4 flex flex-col gap-3 sm:flex-row'>
                    <textarea
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' && !event.shiftKey) {
                                event.preventDefault()
                                handleSubmit()
                            }
                        }}
                        rows='3'
                        placeholder='Example: fever, cough, and body ache for 3 days'
                        className='w-full rounded-xl border border-[#D9E3FF] bg-[#FBFCFF] px-4 py-3 text-sm outline-none transition focus:border-primary'
                    />
                    <button onClick={() => handleSubmit()} className='rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 sm:w-36'>
                        Ask chatbot
                    </button>
                </div>
            </div>

            {latestSuggestion?.doctors?.length > 0 && (
                <div className='mt-5'>
                    <h3 className='text-sm font-semibold uppercase tracking-wide text-gray-500'>Recommended doctors</h3>
                    <div className='mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3'>
                        {latestSuggestion.doctors.map((doctor) => (
                            <button
                                key={doctor._id}
                                onClick={() => openDoctor(doctor._id)}
                                className='rounded-2xl border border-[#E3E9FB] bg-white p-4 text-left transition hover:-translate-y-1 hover:shadow-md'
                            >
                                <div className='flex items-start justify-between gap-3'>
                                    <div>
                                        <p className='font-semibold text-[#262626]'>{doctor.name}</p>
                                        <p className='text-sm text-gray-600'>{doctor.speciality}</p>
                                    </div>
                                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${doctor.available ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                        {doctor.available ? 'Available' : 'Not available'}
                                    </span>
                                </div>
                                <p className='mt-3 text-sm text-gray-500'>{doctor.degree}{doctor.experience ? ` | ${doctor.experience}` : ''}</p>
                                <p className='mt-1 text-sm font-medium text-primary'>Rs. {doctor.fees || 0}</p>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default DoctorSuggestionChatbot
