import Compressor from 'compressorjs';

export default function compressImage(image) {
  return new Compressor(image, {
    quality: 0.5,
    convertSize: 5000,

    // The compression process is asynchronous,
    // which means you have to access the `result` in the `success` hook function.
    success(result) {
      // Send the compressed image file to server with XMLHttpRequest.
      return {
        image: result,
        source: URL.createObjectURL(result),
      };
      // axios.post('/path/to/upload', formData).then(() => {
      //   console.log('Upload success');
      // });
    },
    error(err) {
      console.log(err.message);
    },
  });
}
