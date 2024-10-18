"use client"; // This makes the component a Client Component

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

// Define the interface for your form data
interface Aspect {
  name: string;
  value: string;
}

interface FormData {
  title: string;
  description: string;
  brand: string;
  mpn: string;
  quantity: number;
  aspects: Aspect[];
  imageUrls: string[]; // Make sure this is just string[]
  condition: string;
}

// Validation schema using Yup
const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  brand: yup.string().required('Brand is required'),
  mpn: yup.string().required('MPN is required'),
  quantity: yup
    .number()
    .required('Quantity is required')
    .min(1, 'Quantity must be at least 1'),
  aspects: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Aspect name is required'),
      value: yup.string().required('Aspect value is required')
    })
  ).required('At least one aspect is required'), // Ensure at least one aspect
  imageUrls: yup.array().of(yup.string().url('Must be a valid URL')).required('Image URLs are required'), // Make it required and not optional
  condition: yup.string().required('Condition is required')
});

const EbayListing = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      aspects: [{ name: '', value: '' }],
      imageUrls: [] // Initialize as an empty array
    }
  });

  const [aspects, setAspects] = useState<Aspect[]>([{ name: '', value: '' }]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Form data:', {
      availability: {
        shipToLocationAvailability: {
          quantity: data.quantity
        }
      },
      condition: data.condition,
      product: {
        title: data.title,
        description: data.description,
        aspects: data.aspects.map((aspect) => ({
          name: aspect.name,
          values: [aspect.value]
        })),
        brand: data.brand,
        mpn: data.mpn,
        imageUrls: data.imageUrls
      }
    });
  };

  const addAspect = () => {
    setAspects([...aspects, { name: '', value: '' }]);
  };

  return (
    <div className="bg-white text-black md:h-screen lg:h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Product Information Form</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 font-serif mt-3 gap-5">
          <div>
            <label className="block">Title</label>
            <input {...register('title')} className="border p-2 w-full text-black" />
            <p className="text-red-500">{errors.title?.message}</p>
          </div>

          <div>
            <label className="block">Description</label>
            <textarea {...register('description')} className="border p-2 w-full text-black" />
            <p className="text-red-500">{errors.description?.message}</p>
          </div>

          <div>
            <label className="block">Brand</label>
            <input {...register('brand')} className="border p-2 w-full text-black" />
            <p className="text-red-500">{errors.brand?.message}</p>
          </div>

          <div>
            <label className="block">MPN</label>
            <input {...register('mpn')} className="border p-2 w-full text-black" />
            <p className="text-red-500">{errors.mpn?.message}</p>
          </div>

          <div>
            <label className="block">Condition</label>
            <select {...register('condition')} className="border p-2 w-full text-black">
              <option value="NEW">New</option>
              <option value="USED">Used</option>
            </select>
            <p className="text-red-500">{errors.condition?.message}</p>
          </div>

          <div>
            <label className="block">Quantity</label>
            <input type="number" {...register('quantity')} className="border p-2 w-full text-black" />
            <p className="text-red-500">{errors.quantity?.message}</p>
          </div>

          {aspects.map((aspect, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block">Aspect Name</label>
                <input {...register(`aspects.${index}.name`)} className="border p-2 w-full text-black" />
                <p className="text-red-500">{errors.aspects?.[index]?.name?.message}</p>
              </div>
              <div>
                <label className="block">Aspect Value</label>
                <input {...register(`aspects.${index}.value`)} className="border p-2 w-full text-black" />
                <p className="text-red-500">{errors.aspects?.[index]?.value?.message}</p>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addAspect}
            className="border-2 border-green-500 p-2 mt-2 w-full text-black font-bold bg-transparent hover:text-white hover:bg-gradient-to-br from-black via-green-800 to-green-500"
          >
            Add Aspect
          </button>

          <div className="md:col-span-2">
            <label className="block">Image URLs (Comma separated)</label>
            <input {...register('imageUrls')} className="border p-2 w-full text-black" />
            <p className="text-red-500">{errors.imageUrls?.message}</p>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="p-4 bg-gradient-to-r from-green-400 via-green-800 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg dark:shadow-sm font-bold text-white rounded w-full md:w-auto"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EbayListing;
