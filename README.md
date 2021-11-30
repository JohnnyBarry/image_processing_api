# image_processing_api
An API to return images of the desired size to the user 
Currently the API only servers JPEG images
The current list of images include 'fjord', 'icelandwaterfall', 'palmtunnel', 'santamonica', and 'encenadaport' 

**Running the API**

1. Clone this Branch.
2. Navigate to the image_processing_api directory.
3. Run: npm install
4. To Run the Test suite use command: **npm run test**
5. To Run the Server use command: **npm run serve**

The Api URL will be http://localhost:3000/api/images/

The following URL Parameters are accepted

1. **filename** : This is the name of the image file you wish to receive. (See list above for valid images.) This is a required parameter.
2. **width** : This is the image width you require.
3. **height** : This is the image height you require.
