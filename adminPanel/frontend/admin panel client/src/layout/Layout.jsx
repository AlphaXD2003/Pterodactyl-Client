import React from 'react'
import {Outlet} from 'react-router-dom'
import { Headers, Sidebar} from '../shared/index'
const Layout = () => {
  return (
    <div className='flex flex-row h-screen w-screen overflow-hidden bg-neutral-100'>
        
        <Sidebar/>
     
        <div className='flex flex-col w-screen overflow-auto'>
            {/*<Headers/>*/}
            <div className=' flex-1'>
                <Outlet/>
            </div>
        </div>
    
    </div>
  )
}

export default Layout;