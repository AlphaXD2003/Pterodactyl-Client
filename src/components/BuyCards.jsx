import React from 'react'
import { useNavigate } from 'react-router-dom'

export const BuyCards = ({children , onBuy}) => {
    const navigate = useNavigate()
    const onCancel = () => {
        navigate('/shop')
    }
  return (
    <div className='flex flex-col justify-center items-center'>

        <div>
            {children}
        </div>
        <div className='flex flex-row gap-2'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={onBuy}>
                Buy
            </button>
            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={onCancel}>
                Cancel
            </button>
        </div>
    
    </div>
  )
}
