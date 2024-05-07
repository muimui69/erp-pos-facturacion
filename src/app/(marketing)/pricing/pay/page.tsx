import React from 'react';

interface MembershipPlan {
  name: string;
  description: string;
  price: number;
}

interface CreditCard {
  id: string;
  cardNumber: string;
  expirationDate: string;
}

interface BuyMembershipProps {
  selectedPlan: MembershipPlan;
  userCreditCards: CreditCard[];
}
const selectedPlanExample: MembershipPlan = {
  name: 'Premium Plan',
  description: 'Acceso completo a todas las funciones',
  price: 29.99,
};

const userCreditCardsExample: CreditCard[] = [
  { id: '1', cardNumber: '1234 5678 9012 3456', expirationDate: '12/23' },
  { id: '2', cardNumber: '9876 5432 1098 7654', expirationDate: '06/25' },
];

function PagePay() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-center">
        {/* Sección de registro de tarjeta */}
        <div className="w-3/5 mr-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Registrar tarjeta</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                  Número de tarjeta
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="Ingrese el número de tarjeta"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
                  Fecha de vencimiento
                </label>
                <input
                  type="text"
                  id="expirationDate"
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="MM/YY"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Guardar tarjeta
              </button>
            </form>
          </div>

          {/* Lista de tarjetas vinculadas */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Tarjetas Vinculadas</h2>
            <ul>
              {userCreditCardsExample.map((card) => (
                <li
                  key={card.id}
                  className={`mb-2 p-4 rounded border cursor-pointer `}

                >
                  <span>{card.cardNumber}</span> - <span>{card.expirationDate}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Información del plan seleccionado */}
        <div className="w-2/5 bg-gray-200 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">{selectedPlanExample.name}</h2>
          <p className="text-sm text-gray-700 mb-4">{selectedPlanExample.description}</p>
          <p className="text-lg font-bold text-gray-800 mb-4">${selectedPlanExample.price}</p>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PagePay;
