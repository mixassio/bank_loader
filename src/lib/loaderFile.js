const readUploadedFileAsText = (inputFile, encode = 'utf-8') => {
  const temporaryFileReader = new FileReader();
  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };
    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result);
    };
    temporaryFileReader.readAsText(inputFile, encode);
  });
};

export default readUploadedFileAsText;
