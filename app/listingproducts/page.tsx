// components/Modal.js
'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaPlus,FaEyeSlash } from 'react-icons/fa';
import { FaEye } from "react-icons/fa6";
interface Product {
  id: number; // or string
  asin: string;
  title: string;
  price: number; // or string
  profit: number; // or string
  age: string; // adjust as necessary
  order: number; // or string
  status: string;
}
const Modal = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setloading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const fetchProducts = async () => {
    setloading(true)
    try {
      const response = await fetch('http://localhost:8000/api/products');
      const data = await response.json();
      setProducts(data.data); // Update the state with the fetched products
    setloading(false)

    } catch (error) {
    setloading(false)

      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Call the fetch function when the component mounts
  }, [refresh]);


  const [isOpen, setIsOpen] = useState (false);
  const [ErrorMsg, setErrorMsg] = useState ('');
  const [getByIdData, setGetByIdData] = useState ('');

  const [asin, setasin] = useState('');

 
  const handleSaveClickgetByIds = async (asin: string) => {
    try {
      const response = await fetch('http://localhost:8000/api/get-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ asin }),
      });

      if (!response.ok) {
        throw new Error('Failed to scrape product');
      }

      const data = await response.json();
      console.log('Scraped product data:', data.data);
      setasin(data.data.asin)
      setGetByIdData(data.data)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSaveClickGetById = async (asin:string) => {
    console.log(asin,'_________asin')
    await handleSaveClickgetByIds(asin);  
    setIsOpen(true); // Set the modal state to open
  };
 

  const handleSaveClick = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/scrape-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ asin }),
      });

      if (!response.ok) {
        throw new Error('Failed to scrape product');
        setErrorMsg('Failed to add product')
      }

      const data = await response.json();
      setIsOpen(false)
      setRefresh(!refresh)
      setErrorMsg('')
      console.log('Scraped product data:', data);
    } catch (error) {
  
      console.error('Error:', error);
    }
  };
   const handleOpenModal = () => {
    setasin('')
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setErrorMsg('')

  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setasin(e.target.value);
  };
    // Fetch products from API
  

  return (
    <>
    <div>

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
  Add 
</button>
<div>
 
    </div>
  </div>
  
</div>
    
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-hidden="true"
        >
          <div
            className="relative max-h-full w-full max-w-2xl"
            aria-modal="true"
            role="dialog"
          >
            <div
              className="relative rounded-lg bg-white shadow dark:bg-gray-700"
            >
              <div
                className="flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600"
              >
                <h3
                  className="text-xl font-semibold text-gray-900 dark:text-white lg:text-2xl"
                >
Add ASIN here                </h3>
                <button
                  type="button"
                  className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleCloseModal}
                >
                  <svg
                    className="h-3 w-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                 </button>
              </div>
              <div className="space-y-6 p-6">
                <input
                  type="text"
                  value={asin}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter something"
                />
                <p style={{color:'red',fontSize:'small'}}>{ErrorMsg}</p>
              </div>
              <div
                className="flex items-center space-x-2 rtl:space-x-reverse rounded-b border-t border-gray-200 p-6 dark:border-gray-600"
              >
                  <button
                        onClick={handleSaveClick}

                    type="button"
                    className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save
                  </button>
                <button
                onClick={()=>{setIsOpen(false)
      setErrorMsg('')}

                }
                  type="button"
                  className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

 
 



<div className="container mx-auto px-4 py-8">
<h1 className="text-3xl font-bold mb-6 text-center">Listing Products</h1>
<div className="grid grid-cols-1 gap-6">
  
 

{loading?

(
  <div role="status" className="flex items-center justify-center min-h-screen">
    <svg
       aria-hidden="true"
      className="w-40 h-40 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 max-w-lg text-3xl font-semibold"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span className="sr-only">Loading...</span>
</div>

 
):(
  <div className="main1 flex flex-col justify-center  ">
      <table className="w-full  mt-4 border-collapse">
          <thead className='text-white font-bold' style={{ backgroundColor: "#202c34" }}>
            <tr>
              <th className="px-4 py-2">ASIN</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">View</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Profit</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Order</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
{products.map((data) => (

            <tr key={data.id}>
              
              <td className="border text-center border-gray-300 px-4 py-2">{data.asin}</td>
              <td className="border border-gray-300 px-4 py-2">{data.title}</td>
              <td className="border border-gray-300 px-4 py-2">
      <FaEye onClick={()=>{handleSaveClickGetById(data.asin)}} style={{ color: 'red' }} />
    </td>
              <td className="border border-gray-300 px-4 py-2">{data.price}</td>
              <td className="border border-gray-300 px-4 py-2">{data.profit}</td>
              <td className="border border-gray-300 px-4 py-2">{data.age}</td>
              <td className="border border-gray-300 px-4 py-2">{data.order}</td>
              <td className="border border-gray-300 px-4 py-2">{data.status}</td>
            </tr>
))}
          </tbody>
        </table>

     </div>
  )
}

</div>
</div>


</>
  );
};

export default Modal;