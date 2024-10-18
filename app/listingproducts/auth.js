const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const authenticate = async () => {
  let retries = 5; // Maximum retries
  let delay = 1000; // Initial delay of 1 second

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const token = await ebayApi.getAccessToken();
      console.log(`Access token: ${token}`);
      return token; // Return the token
    } catch (error) {
      if (error.status === 429) {
        console.error(`Rate limit reached, retrying in ${delay / 1000} seconds...`);
        await sleep(delay);
        delay *= 2; // Exponential backoff: double the delay each time
      } else {
        console.error('Error authenticating:', error);
        throw error;
      }
    }
  }
  throw new Error('Max retries exceeded.');
};
export default authenticate