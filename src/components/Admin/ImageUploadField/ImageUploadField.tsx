"use client";

import React, { useCallback, InputHTMLAttributes } from "react";
import Image from "next/image";
import Dropzone, { useDropzone, FileWithPath } from "react-dropzone";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { FieldValues, UseFormSetValue } from "react-hook-form";

interface ImageUploadFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  setValue: UseFormSetValue<FieldValues>;
}

function ImageUploadField({ setValue, name, value }: ImageUploadFieldProps) {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setValue(name, acceptedFiles);
    },
    [setValue, name]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".png"],
      },
      onFileDialogCancel: () => {
        setValue(name, undefined);
      },
    });

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
                  width={300}
                  height={200}
                  className="object-cover -translate-y-1/2"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div {...getRootProps()}>
        <input {...getInputProps({ value: value })} />
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
