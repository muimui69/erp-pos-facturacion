"use client"; // Asegúrate de usar la directiva correcta

import React, { useState } from 'react';
import { Icons } from './icons';

export function Notificacionesnav() {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const notifications = [
    {
      imgSrc: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80',
      name: 'Tania',
      message: 'send you a message',
      time: '13 minutes ago',
    },
    {
      imgSrc: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1061&amp;q=80',
      name: 'Natali',
      message: 'replied to your email',
      time: 'an hour ago',
    },
    {
      imgSrc: 'https://dwglogo.com/wp-content/uploads/2016/08/PayPal_Logo_Icon.png',
      name: 'PayPal',
      message: 'received a payment.',
      time: '5 hours ago',
    },{
        imgSrc: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80',
        name: 'Tania',
        message: 'send you a message',
        time: '13 minutes ago',
      },
      {
        imgSrc: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1061&amp;q=80',
        name: 'Natali',
        message: 'replied to your email',
        time: 'an hour ago',
      },
      {
        imgSrc: 'https://dwglogo.com/wp-content/uploads/2016/08/PayPal_Logo_Icon.png',
        name: 'PayPal',
        message: 'received a payment.',
        time: '5 hours ago',
      },
    // Añade más notificaciones aquí para probar el scroll
  ];

  return (
    <div className="relative">
      <button
        className="middle none center flex items-center justify-center rounded-lg p-3 font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        data-ripple-dark="true"
        onClick={toggleNotifications}
      >
        <Icons.notification className="fas fa-bell text-lg leading-none"/>
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
              imgSrc={notification.imgSrc}
              name={notification.name}
              message={notification.message}
              time={notification.time}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function NotificationItem({ imgSrc, name, message, time }) {
  return (
    <button
      role="menuitem"
      className="flex w-full cursor-pointer select-none items-center gap-4 rounded-md px-3 py-2 pr-8 pl-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
    >
      <img
        alt={name}
        src={imgSrc}
        className="relative inline-block h-12 w-12 !rounded-full object-cover object-center"
      />
      <div className="flex flex-col gap-1">
        <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
          <span className="font-medium text-blue-gray-900">{name}</span> {message}
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
    </button>
  );
}