import ebayApi from './ebay-api';
import authenticate from './auth';

const listProducts = async (products) => {
  try {
    // Authenticate and get the access token
    const token = await authenticate();

    // Prepare the products for eBay
    const ebayProducts = products.map((product) => ({
      Title: product.name, // Product name
      Description: product.description, // Product description
      StartPrice: product.price, // Starting price
      CategoryId: product.categoryId, // Category ID
      // Add more fields as required
    }));

    // List the products on eBay
    const response = await ebayApi.addItems(ebayProducts, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the access token
      },
    });

    console.log(`Products listed successfully: ${response}`);
  } catch (error) {
    console.error('Error listing products:', error);
  }
};

export default listProducts;
