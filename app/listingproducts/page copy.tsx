'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { FaPlus } from "react-icons/fa";
const ListingProducts = async () => {

  const [isOpen, setIsOpen] = useState (false);
  const [inputValue, setInputValue] = useState('');

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products');
      const data = await response.json();
      return data.data; // Return the products array
      console.log(data.data,'++++++++')
    } catch (error) {
      console.error('Error fetching products:', error);
      return []; // Return an empty array in case of error
    }
  };

  // Call the fetch function
  const products = await fetchProducts();

  // Log the fetched data in the console
  console.log(products);

  return (<>

<div className="grid grid-cols-12 gap-4">
  <div className="col-span-2"> </div>
  <div className="col-span-2"></div>
  <div className="col-span-2"></div>
  <div className="col-span-2"></div>
  <div className="col-span-2  "></div>
  <div className="col-span-1">
  <button
        onClick={handleOpenModal}
        className="flex items-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
>
  <FaPlus className="mr-2" />
  Green
</button>
<div>
 
    </div>
  </div>
  
</div>




 









    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Listing Products</h1>
      <div className="grid grid-cols-1 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg flex flex-col sm:flex-row w-full">
            <div className="sm:w-1/3 p-4 flex justify-center">
              <Image 
                src={JSON.parse(product.images)[1]} 
                alt={product.title} 
                width={300} 
                height={200} 
                className="rounded-lg object-cover h-full" 
              />
            </div>
            <div className="flex-grow flex flex-col justify-center p-4">
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-700">
                Price: <span className="font-bold">${product.price}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );




};

export default ListingProducts;



products.map((product) => (
  <div key={product.id} className="bg-white shadow-md rounded-lg flex flex-col sm:flex-row w-full">
    <div className="sm:w-1/3 p-4 flex justify-center">
      <Image 
        src={JSON.parse(product.images)[1]} 
        alt={product.title} 
        width={300} 
        height={200} 
        className="rounded-lg object-cover h-full" 
      />
    </div>
    <div className="flex-grow flex flex-col justify-center p-4">
      <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
      <p className="text-gray-700">
        Price: <span className="font-bold">${product.price}</span>
      </p>
    </div>
  </div>
)) 