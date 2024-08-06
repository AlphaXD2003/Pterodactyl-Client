import { ImBlogger2 } from "react-icons/im";
import { TfiAnnouncement } from "react-icons/tfi";
import { MdContactSupport } from "react-icons/md";
import { FaFirstOrderAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import React from "react";
import useLogout from "../customHooks/logout";

export const sideBarTopMenu = [
    {
        name: 'Blogs',
        path : '/admin/blogs',
        icon: <ImBlogger2 />
    },
    {
        name: 'Annoucement',
        path : '/admin/announcement',
        icon: <TfiAnnouncement />
    },
    {
        name: 'Contact',
        path : '/admin/contact',
        icon: <MdContactSupport />
    },
    {
        name: 'Orders',
        path : '/admin/orders',
        icon: <FaFirstOrderAlt />
    },
    {
        name: 'Vouchers',
        path: '/admin/vouchers'
        
    }
];

export const sideBarBottomMenu = [

        // {
        //     name: 'Profile',
        //     path : '/admin/profile',
        //     icon: <FaUser />
        // },
        {
            name: 'Logout',
            path : '/admin/logout',
            icon: <FaSignOutAlt />,
           
            
        }

];

