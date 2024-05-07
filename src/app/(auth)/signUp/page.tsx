import Link from "next/link";
import React from 'react';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-96 text-white">
        <h1 className="text-3xl font-light text-center mb-6">PointSync</h1>
        <p className="text-lg text-black bg-gray-400 py-3 px-6 rounded mb-10 text-center">
          Acceda y gestione su cuenta desde esta instancia en PointSync
        </p>
        <form className="space-y-10"> {/* Incrementado el espacio vertical entre elementos */}
          <div className="relative">
            <input
              id="email"
              className="w-full py-2 px-4 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none"
              type="email"
              placeholder="Correo Electrónico"
            />
          </div>
          <div className="relative">
            <input
              id="password"
              className="w-full py-2 px-4 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none"
              type="password"
              placeholder="Contraseña"
            />
          </div>
          <div className="flex justify-end">
            <button className="w-full bg-white hover:bg-gray-300 text-gray-800 hover:text-blue-600 py-3 px-6 rounded-lg shadow">
              Iniciar Sesion
            </button>
          </div>
        </form>
        <div className="mt-12"> {/* Incrementado el margen superior */}
          <p className="text-sm text-gray-400 flex items-center justify-between">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="font-bold text-blue-400 hover:text-blue-200 hover:underline ml-auto">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
