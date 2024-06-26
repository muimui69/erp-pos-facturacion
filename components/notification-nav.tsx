"use client";

import { useState } from 'react';
import { Icons } from './icons';
import { useNotificationInvitations } from '@/hooks/use-notification-invitations';
import { useParamsSaas } from '@/hooks/use-params-saas';
import Link from 'next/link';

interface notification {
    imgSrc?: string;
    name: string;
    message: string;
    time: string;
    id: number;
}


export function Notificacionesnav() {

    const { user } = useParamsSaas()
    const { notifications } = useNotificationInvitations(user?.token);

    const [showNotifications, setShowNotifications] = useState(false);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };


    return (
        <div className="relative">
            <button
                className="middle none center flex items-center justify-center rounded-lg p-3 font-sans text-xs font-bold uppercase transition-all   disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-dark="true"
                onClick={toggleNotifications}
            >
                <Icons.notification className="fas fa-bell text-lg leading-none" />
            </button>
            {showNotifications && (
                <ul
                    role="menu"
                    data-popover="notifications-menu"
                    data-popover-placement="bottom"
                    className="absolute right-0 z-10 mt-2 max-h-64 w-80 flex flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
                >
                    {notifications.map((notification, index) => (
                        <NotificationItem
                            key={index}
                            // imgSrc={notification.imgSrc}
                            name={notification.tenant.name}
                            message={notification.rol.desc}
                            time={notification.createdAt}
                            id={notification.id}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

function NotificationItem({ imgSrc, name, message, time, id }: notification) {
    return (
        <Link
            href={`/invitation/${id}`}
            className="flex w-full cursor-pointer select-none items-center gap-4 rounded-md px-3 py-2 pr-8 pl-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
        >
            {/* <img
                alt={name}
                src={imgSrc}
                className="relative inline-block h-12 w-12 !rounded-full object-cover object-center"
            /> */}
            <div className="flex flex-col gap-1">
                <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
                    Se le ha invitado a formar parte del punto de venta llamado <strong>{name}</strong> con el rol de  <strong>{message}.</strong>
                </p>
                <p className="flex items-center gap-1 font-sans text-xs font-light text-gray-600 antialiased">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-3 w-3"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                    {time}
                </p>
            </div>
        </Link>
    );
}