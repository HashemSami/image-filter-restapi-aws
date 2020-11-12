# Image Filtering Microservice

## Generel info

This project for the Udacity Cloud Engineering Nanodegree. It is a simple cloud image filtering microservice which runs a simple script to process images.

## Technologies

- nodejs
- aws

## Dependencies

- express.js
- jimp
- body-parser
- axios

## Setup

- Clone this repo and install the dependencies by running `npm i` in your terminal.
- Run `npm run dev` to run the server.
- You can [use Postman](https://www.postman.com/downloads/) to send a get request with the image url as a parameter to the rever using this request:
  `http://localhost:8082/filteredimage?image_url={{your downloadable image URL}}`
- You will get the response with the filtered image.
