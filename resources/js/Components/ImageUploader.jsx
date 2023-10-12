import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import InputLabel from './InputLabel';
import { TiDelete } from 'react-icons/ti';

export default function ImageUploader({ className, setData, data }) {
    const [files, setFiles] = useState([]);
    const [rejected, setRejected] = useState([]);

    useEffect(() => {
        setData({ ...data, images: files });
    }, [files]);
    //[JSON.stringify(...files)]
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles?.length) {
            setFiles((previousFiles) => [
                ...previousFiles,
                ...acceptedFiles.map((file) =>
                    Object.assign(file, { preview: URL.createObjectURL(file) }),
                ),
            ]);
        }

        if (rejectedFiles?.length) {
            setRejected((previousFiles) => [
                ...previousFiles,
                ...rejectedFiles,
            ]);
        }
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': [],
        },
        maxSize: 1024 * 1000,
    });

    const removeFile = (name) => {
        setFiles((files) => files.filter((file) => file.name !== name));
    };

    const removeRejected = (name) => {
        setRejected((files) => files.filter(({ file }) => file.name !== name));
    };

    return (
        <>
            <InputLabel
                className={`text-xl`}
                htmlFor="images"
                value="Immagini"
            />

            <p className="pt-2">Dimensioni massime: 1 Mb</p>

            <div
                {...getRootProps({
                    className,
                })}
            >
                <input
                    {...getInputProps()}
                    id="images"
                    name="images"
                    form="productForm"
                />
                {isDragActive ? (
                    <p>Trascina i file qui ...</p>
                ) : (
                    <p>Trascina qui i file, o clicca per selezionarli</p>
                )}
            </div>

            {/* File Rifiutati */}
            <ul className="mt-3 flex flex-col">
                {rejected.map(({ file, errors }) => (
                    <li
                        key={file.name}
                        className="flex items-start justify-between"
                    >
                        <div>
                            <p className="mt-2 text-sm font-medium text-neutral-500">
                                {file.name}
                            </p>
                            <ul className="text-sm text-red-500">
                                {errors.map((error) => (
                                    <li key={error.code}>{error.message}</li>
                                ))}
                            </ul>
                        </div>
                        <button
                            type="button"
                            className="border-secondary-400 mt-1 rounded-md border bg-red-500 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-600"
                            onClick={() => removeRejected(file.name)}
                        >
                            remove
                        </button>
                    </li>
                ))}
            </ul>

            {/* File Accettati */}
            <h3 className="title mt-2 border-b pb-3 text-lg font-semibold text-neutral-600">
                Anteprima
            </h3>

            <ul className="mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {files.map((file, _) => (
                    <li key={_} className="relative h-32 rounded-md shadow-lg">
                        <img
                            src={file.preview}
                            alt={file.name}
                            width={100}
                            height={100}
                            onLoad={() => {
                                URL.revokeObjectURL(file.preview);
                            }}
                            className="h-full w-full rounded-md object-contain"
                        />
                        <button
                            type="button"
                            className="border-secondary-400 bg-secondary-400 absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full border transition-colors hover:bg-white"
                            onClick={() => removeFile(file.name)}
                        >
                            <TiDelete className="h-10 w-10 text-red-500  transition-colors hover:fill-red-600" />
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}
