import React from 'react'
import classNames from 'classnames'
const DashboardCards = ({
    text1, currentvalue, percentage, gap,className=''
}) => {

  return (
    <div className={`w-[380px] h-[150px] bg-white flex flex-col  ${className}`}>
        <div className='text-neutral-800'>
            {text1}
        </div>
        <div className='flex flex-row mt-2'>
            <div className='font-bold text-neutral-900 gap-2'>
                {currentvalue}&nbsp;&nbsp;
            </div>
            <div className = {classNames( (percentage > 0) ? "bg-blue-600" : "bg-yellow-600" , "px-6 ml-1 rounded-lg text-white font-bold" )}>
            💹{Math.abs(percentage)}%
            </div>
        </div>
        <div className='mt-6 flex flex-row'>
            You have made {gap < 0 ? "negataive" : "positive"}  &nbsp;
                <div className={classNames(gap < 0  ? "text-red-500" : "text-blue-500")}>{Math.abs(gap)}</div>
                &nbsp;this year
        </div>
        
    </div>
  )
}

export default DashboardCards