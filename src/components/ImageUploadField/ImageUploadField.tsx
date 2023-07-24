"use client";

import Image from "next/image";
import React, { useCallback, InputHTMLAttributes } from "react";
import { useDropzone } from "react-dropzone";
import { HiOutlineCloudUpload } from "react-icons/hi";

function ImageUploadField({ ...props }: InputHTMLAttributes<HTMLInputElement>) {
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
    <>
      {acceptedFiles.length > 0 && (
        <div className="mb-4">
          <p className="label-text text-gray-700 font-bold">Preview</p>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {acceptedFiles.map((value, index) => (
              <div
                key={index}
                className="relative h-16 w-full border rounded-md overflow-hidden"
              >
                <Image
                  key={index}
                  src={URL.createObjectURL(value)}
                  alt={value.name}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div {...getRootProps()}>
        <input {...getInputProps({ onChange: props.onChange })} />
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
      </div>
    </>
  );
}

export default ImageUploadField;
