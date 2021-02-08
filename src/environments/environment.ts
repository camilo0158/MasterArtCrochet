export const environment = {
  production: false,
  azureb2c: {
    clientId: '1ad9c720-b401-4009-95a7-7346d7df02d1',
    authority: 'https://login.microsoftonline.com/common',
    // redirectUri: 'http://localhost:4200/',
    redirectUri: 'https://masterartcrochetstatic.z13.web.core.windows.net/home',   
    cacheLocation: 'localStorage',
  },
  masterAppApi: {
    baseApi: 'http://masterappcrochet.azurewebsites.net/api/',
  },
  masterAppBlobStorageApi: {
    baseApi: 'http://masterappcrochetstorage.azurewebsites.net/api',
  },
  masterAppBlobStorageFiles: {
    baseApi: 'https://masterartstorage.blob.core.windows.net/images',
    container: 'images/'
  },
};
