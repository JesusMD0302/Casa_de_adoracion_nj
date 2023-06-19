"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { HiOutlineCloudUpload } from "react-icons/hi";

function ImageUploadField() {
  const onDrop = useCallback((acceptedFiles: any[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <HiOutlineCloudUpload className="w-10 h-10 text-gray-400" />
          <p className="mb-2 text-sm text-gray-500 text-center">
            {isDragActive ? (
              <span className="font-semibold">Suelte las imagenes</span>
            ) : (
              <>
                <span className="font-semibold">Click para seleccionar</span>o
                arrastra y suelta la(s) imagen(es)
              </>
            )}
          </p>
          <p className="text-xs text-gray-500">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
      </div>
      <p>{JSON.stringify(acceptedFiles)}</p>
    </div>
  );
}

export default ImageUploadField;