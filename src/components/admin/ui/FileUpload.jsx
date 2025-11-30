import { useRef, useState } from 'react';
import { UploadSimple, X, CheckCircle } from '@phosphor-icons/react';

/**
 * FileUpload Component
 * Drag-and-drop file upload with preview and validation
 * 
 * @param {Object} props
 * @param {Function} props.onUpload - Upload handler (receives File object)
 * @param {string} props.accept - Accepted file types (e.g., 'image/*')
 * @param {number} props.maxSize - Max file size in bytes
 * @param {boolean} props.preview - Show image preview
 * @param {string} props.currentUrl - Current file URL (for editing)
 */
const FileUpload = ({ 
  onUpload, 
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB default
  preview = true,
  currentUrl = null,
  className = ''
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentUrl);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  /**
   * Validate file
   */
  const validateFile = (file) => {
    if (maxSize && file.size > maxSize) {
      const sizeMB = (maxSize / (1024 * 1024)).toFixed(1);
      setError(`File size must be less than ${sizeMB}MB`);
      return false;
    }
    setError(null);
    return true;
  };

  /**
   * Handle file selection
   */
  const handleFileSelect = (file) => {
    if (!validateFile(file)) return;

    setSelectedFile(file);

    // Create preview for images
    if (preview && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }

    // Call upload handler
    if (onUpload) {
      onUpload(file);
    }
  };

  /**
   * Handle drag events
   */
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  /**
   * Handle input change
   */
  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  /**
   * Clear selection
   */
  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl(currentUrl);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8
          transition-all duration-300 cursor-pointer
          ${isDragging 
            ? 'border-accent bg-accent/10' 
            : error 
              ? 'border-red-500 bg-red-500/5'
              : 'border-white/20 hover:border-accent/50 bg-base-tint'
          }
        `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />

        {/* Preview */}
        {preview && previewUrl ? (
          <div className="relative">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="max-h-48 mx-auto rounded-lg"
            />
            {selectedFile && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className="absolute top-2 right-2 p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
              >
                <X size={16} className="text-white" />
              </button>
            )}
          </div>
        ) : (
          <div className="text-center">
            <UploadSimple size={48} className="mx-auto mb-4 text-accent" />
            <p className="text-text-bright font-medium mb-2">
              {isDragging ? 'Drop file here' : 'Click or drag file to upload'}
            </p>
            <p className="text-text-muted text-sm">
              {accept} • Max {(maxSize / (1024 * 1024)).toFixed(1)}MB
            </p>
          </div>
        )}

        {/* Success Indicator */}
        {selectedFile && !error && (
          <div className="flex items-center justify-center gap-2 mt-4 text-green-400">
            <CheckCircle weight="bold" size={20} />
            <span className="text-sm font-medium">{selectedFile.name}</span>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;
