import React from 'react';
import { IoPizzaOutline } from "react-icons/io5";
import { PiHamburgerBold } from "react-icons/pi";
import { LiaHotdogSolid } from "react-icons/lia";
import { TbMilkshake } from "react-icons/tb";

const Filtro = ({ filtroPorPizza, filtroPorHamburgueres, milkShake, hotDogs }) => {
  return (
    <div className="max-w-3xl mx-auto px-6 bg-white rounded-lg shadow-md py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        <button
          onClick={filtroPorPizza}
          className="flex flex-col md:flex-row items-center gap-2 bg-gray-100 hover:bg-gray-200 p-4 rounded-lg transition duration-200"
        >
          <IoPizzaOutline className="text-4xl text-red-600" />
          <span className="text-gray-700">Pizzas</span>
        </button>

        <button
          onClick={filtroPorHamburgueres}
          className="flex flex-col md:flex-row items-center gap-2 bg-gray-100 hover:bg-gray-200 p-4 rounded-lg transition duration-200"
        >
          <PiHamburgerBold className="text-4xl text-yellow-600" />
          <span className="text-gray-700">Hambúrgueres</span>
        </button>

        <button
          onClick={hotDogs}
          className="flex flex-col md:flex-row items-center gap-2 bg-gray-100 hover:bg-gray-200 p-4 rounded-lg transition duration-200"
        >
          <LiaHotdogSolid className="text-4xl text-orange-600" />
          <span className="text-gray-700">Hot Dogs</span>
        </button>

        <button
          onClick={milkShake}
          className="flex flex-col md:flex-row items-center gap-2 bg-gray-100 hover:bg-gray-200 p-4 rounded-lg transition duration-200"
        >
          <TbMilkshake className="text-4xl text-pink-600" />
          <span className="text-gray-700">Milkshakes</span>
        </button>
      </div>
    </div>
  );
};

export default Filtro;
