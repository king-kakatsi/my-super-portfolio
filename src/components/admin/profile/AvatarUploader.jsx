import { useState } from 'react';
import { useFileUpload } from '../../../hooks/useFileUpload';
import { User } from '@phosphor-icons/react';
import toast from 'react-hot-toast';
import FileUpload from '../ui/FileUpload';

/**
 * Avatar Uploader Component
 * Upload and preview profile avatar
 * 
 * @param {Object} props
 * @param {string} props.currentUrl - Current avatar URL
 * @param {Function} props.onUpload - Callback when upload completes
 */
const AvatarUploader = ({ currentUrl, onUpload }) => {
  const { upload, uploading, progress } = useFileUpload('avatars');
  const [avatarUrl, setAvatarUrl] = useState(currentUrl);

  /**
   * Handle file upload
   */
  const handleUpload = async (file) => {
    try {
      const url = await upload(file);
      setAvatarUrl(url);
      
      if (onUpload) {
        onUpload(url);
      }

      toast.success('Avatar uploaded successfully!', {
        style: {
          background: '#8B1538',
          color: '#fff',
          padding: '16px',
          borderRadius: '12px',
        },
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload avatar');
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      {/* Current Avatar Preview */}
      <div className="flex-shrink-0">
        <div className="w-32 h-32 rounded-full bg-base-tint border-2 border-accent/30 overflow-hidden flex items-center justify-center">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={64} className="text-text-muted" />
          )}
        </div>
      </div>

      {/* Upload Area */}
      <div className="flex-1 w-full">
        <FileUpload
          onUpload={handleUpload}
          accept="image/*"
          maxSize={2 * 1024 * 1024} // 2MB
          preview={false}
          currentUrl={avatarUrl}
        />

        {/* Upload Progress */}
        {uploading && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-muted">Uploading...</span>
              <span className="text-sm text-accent font-bold">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full h-2 bg-base-tint rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarUploader;
