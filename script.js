const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// Your Neocities site ID
const SITE_ID = 'your_site_id';

// Upload a file to Neocities
async function uploadFile(filePath) {
  const url = `https://${SITE_ID}.neocities.org/upload`;

  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath));

  try {
    const response = await axios.post(url, formData, {
      headers: formData.getHeaders()
    });
    console.log(response.data);
    console.log('File uploaded successfully!');
  } catch (error) {
    console.error('File upload failed.', error);
  }
}

// Download a file from Neocities
async function downloadFile(fileName) {
  const url = `https://${SITE_ID}.neocities.org/${fileName}`;

  try {
    const response = await axios.get(url);
    console.log(response.data);
    console.log('File downloaded successfully!');
    return response.data;
  } catch (error) {
    console.error('File download failed.', error);
  }
}

// Update a file on Neocities
async function updateFile(fileName, newFilePath, newFileName) {
  const url = `https://${SITE_ID}.neocities.org/${fileName}`;

  const formData = new FormData();
  if (newFilePath) {
    formData.append('file', fs.createReadStream(newFilePath), newFileName || '');
  }

  try {
    const response = await axios.post(url, formData, {
      headers: formData.getHeaders()
    });
    console.log(response.data);
    console.log('File updated successfully!');
  } catch (error) {
    console.error('File update failed.', error);
  }
}

module.exports = { uploadFile, downloadFile, updateFile };
