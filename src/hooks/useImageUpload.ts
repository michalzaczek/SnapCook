import React, { useState, useRef, useCallback } from 'react';

const useImageUpload = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Function to handle the change in the input file
  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        setImage(file);

        // Creating a reader to convert the image to base64
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            setImageBase64(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  // Function to trigger the file input
  const triggerInput = useCallback(() => {
    inputRef.current?.click();
  }, [inputRef]);

  return {
    image,
    imageBase64,
    inputRef,
    handleImageChange,
    triggerInput,
  };
};

export default useImageUpload;
