import axios from 'axios';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const response = await axios.post('https://api.sandbox.ebay.com/identity/v1/oauth2/token', null, {
        auth: {
          username: 'Ehtesham-Ehtesham-SBX-36deb8e82-a5ef8b19', // App ID
          password: 'SBX-6deb8e824f2b-9799-4a75-a27f-cf64', // Cert ID
        },
        params: {
          grant_type: 'client_credentials',
          scope: 'https://api.ebay.com/oauth/api_scope', // Specify required scopes
        },
      });

      res.status(200).json({ accessToken: response.data.access_token });
    } catch (error) {
      console.error('Error obtaining access token:', error);
      res.status(500).json({ error: 'Failed to obtain access token' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
