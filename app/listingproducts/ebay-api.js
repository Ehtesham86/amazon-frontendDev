import { EbayApi } from 'ebay-api';

const ebayApi = new EbayApi({
  appId: 'Ehtesham-Ehtesham-SBX-36deb8e82-a5ef8b19', // Your App ID
  certId: 'SBX-6deb8e824f2b-9799-4a75-a27f-cf64', // Your Cert ID
  devId: '9b86ca3d-b412-4691-ba3b-647838fc3e32', // Your Dev ID
  sandbox: true, // Set to false for production
});

export default ebayApi;
