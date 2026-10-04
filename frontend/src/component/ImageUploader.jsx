import { useEffect, useId, useRef, useState } from 'react'
import { ImagePlus, Upload, X } from 'lucide-react'

const ImageUploader = ({
    name = "image",
    label = "Task image",
    maxSizeMB = 5,
    onImageChange,
    image,
    setImage
}) => {

    const [imageError, setImageError] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const fileInputRef = useRef(null);
    const inputId = useId();

    useEffect(() => {
        if (!image) {
            setImagePreview("");
            return undefined;
        }

        const previewUrl = URL.createObjectURL(image);
        setImagePreview(previewUrl);
        return () => URL.revokeObjectURL(previewUrl);
    }, [image]);

    const setImageFile = (file) => {
        setImageError("");
        if (!file) return false;

        if (!file.type.startsWith("image/")) {
            setImage(null);
            onImageChange?.(null);
            setImageError("Choose an image file.");
            return false;
        }

        if (file.size > maxSizeMB * 1024 * 1024) {
            setImage(null);
            onImageChange?.(null);
            setImageError(`Image must be ${maxSizeMB} MB or smaller.`);
            return false;
        }

        setImage(file);
        onImageChange?.(file);
        return true;
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files[0];

        if (setImageFile(file) && fileInputRef.current) {
            const transfer = new DataTransfer();
            transfer.items.add(file);
            fileInputRef.current.files = transfer.files;
        }
    };

    const removeImage = () => {
        setImage(null);
        setImageError("");
        onImageChange?.(null);
        setImagePreview("")
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleFileChange = (event) => {
        if (!setImageFile(event.target.files[0])) event.target.value = "";
    };

    return (
        <div>
            <label className="mb-3 block text-sm font-semibold text-gray-800" htmlFor={inputId}>
                {label}
            </label>
            <input
                ref={fileInputRef}
                id={inputId}
                name={name}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleFileChange}
            />
            {imagePreview ? (
                <div className="flex items-center gap-4 rounded-xl border border-gray-300 p-3">
                    <img
                        src={imagePreview}
                        alt={`Selected ${label.toLowerCase()}`}
                        className="h-20 w-20 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">{image.name}</p>
                        <p className="mt-1 text-xs text-gray-500">{(image.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                    <button
                        type="button"
                        onClick={removeImage}
                        aria-label="Remove selected image"
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                    >
                        <X size={18} />
                    </button>
                </div>
            ) : (
                <div
                    onDragEnter={(event) => { event.preventDefault(); setIsDragging(true); }}
                    onDragOver={(event) => event.preventDefault()}
                    onDragLeave={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget)) setIsDragging(false);
                    }}
                    onDrop={handleDrop}
                    className={`rounded-xl border-2 border-dashed px-5 py-8 text-center transition-colors ${isDragging ? "border-primary bg-blue-50" : "border-gray-300 hover:border-gray-400"
                        }`}
                >
                    <ImagePlus size={28} className="mx-auto text-primary" />
                    <p className="mt-3 text-sm font-medium text-gray-800">Drag and drop an image here</p>
                    <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF or another image format, up to {maxSizeMB} MB</p>
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        <Upload size={16} />
                        Browse files
                    </button>
                </div>
            )}
            {imageError && <p role="alert" className="mt-2 text-sm text-red-600">{imageError}</p>}
        </div>
    );
};

export default ImageUploader;