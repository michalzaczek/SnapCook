import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader: React.FC = () => {
  const [image, setImage] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target!.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      const base64 = image.split(',')[1]; // Remove the base64 prefix
      const response = await axios.post(
        'https://us-central1-snapcook-test.cloudfunctions.net/getIngredients',
        { image: base64 }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleSubmit}>Identify Ingredients</button>
    </div>
  );
};

export default ImageUploader;
