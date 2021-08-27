import Compressor from 'compressorjs';

export default function helperImage(type, file) {
  if (type === 'compress') {
    return new Compressor(file, {
      quality: 0.5,
      convertSize: 5000,
      success(success) {
        return success;
      },
      error(err) {
        console.log(err.message);
      },
    });
  }

  if (type === 'convertBlob') {
    let reader = new FileReader();
    reader.onload = (e) => {
      return e.target.result;
    };
    reader.readAsDataURL(file);
    return reader;
  }

  if (type === 'convertUrl') {
    return URL.createObjectURL(file);
  }
}
