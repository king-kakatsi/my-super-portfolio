import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { useFileUpload } from '../../../hooks/useFileUpload';
import toast from 'react-hot-toast';
import { FloppyDisk } from '@phosphor-icons/react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import AvatarUploader from './AvatarUploader';
import FileUpload from '../ui/FileUpload';

/**
 * Profile Editor Component
 * Edit profile information and avatar
 */
const ProfileEditor = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { upload, uploading } = useFileUpload('resumes');
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    avatar: '',
    cvUrl: '',
    social: {
      github: '',
      linkedin: '',
      twitter: ''
    }
  });

  /**
   * Fetch profile data
   */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'content', 'profile');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData(docSnap.data());
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /**
   * Handle input change
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('social.')) {
      const socialKey = name.split('.')[1];
      setFormData({
        ...formData,
        social: {
          ...formData.social,
          [socialKey]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  /**
   * Handle avatar upload
   */
  const handleAvatarUpload = (url) => {
    setFormData({
      ...formData,
      avatar: url
    });
  };

  /**
   * Handle CV upload
   */
  const handleCVUpload = async (file) => {
    try {
      const url = await upload(file);
      setFormData({
        ...formData,
        cvUrl: url
      });
      toast.success('CV uploaded successfully!');
    } catch (error) {
      console.error('CV upload error:', error);
      toast.error('Failed to upload CV');
    }
  };

  /**
   * Save profile
   */
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const docRef = doc(db, 'content', 'profile');
      await updateDoc(docRef, {
        ...formData,
        updatedAt: new Date()
      });

      toast.success('Profile updated successfully!', {
        style: {
          background: '#8B1538',
          color: '#fff',
          padding: '16px',
          borderRadius: '12px',
        },
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="max-w-4xl space-y-6">
      {/* Avatar Upload */}
      <Card>
        <Card.Header>
          <h3 className="text-xl font-bold text-text-bright">
            Profile Picture
          </h3>
        </Card.Header>
        <Card.Body>
          <AvatarUploader 
            currentUrl={formData.avatar}
            onUpload={handleAvatarUpload}
          />
        </Card.Body>
      </Card>

      {/* Basic Information */}
      <Card>
        <Card.Header>
          <h3 className="text-xl font-bold text-text-bright">
            Basic Information
          </h3>
        </Card.Header>
        <Card.Body>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />

            <Input
              label="Title/Role"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Full Stack Developer"
              required
            />

            <Input
              type="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />

            <Input
              type="tel"
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 234 567 8900"
            />

            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="San Francisco, CA"
              className="md:col-span-2"
            />

            <Textarea
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              rows={4}
              className="md:col-span-2"
            />
          </div>
        </Card.Body>
      </Card>

      {/* Social Links */}
      <Card>
        <Card.Header>
          <h3 className="text-xl font-bold text-text-bright">
            Social Media
          </h3>
        </Card.Header>
        <Card.Body>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="GitHub"
              name="social.github"
              value={formData.social?.github || ''}
              onChange={handleChange}
              placeholder="https://github.com/username"
            />

            <Input
              label="LinkedIn"
              name="social.linkedin"
              value={formData.social?.linkedin || ''}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
            />

            <Input
              label="Twitter"
              name="social.twitter"
              value={formData.social?.twitter || ''}
              onChange={handleChange}
              placeholder="https://twitter.com/username"
            />
          </div>
        </Card.Body>
      </Card>

      {/* CV Upload */}
      <Card>
        <Card.Header>
          <h3 className="text-xl font-bold text-text-bright">
            Resume/CV
          </h3>
        </Card.Header>
        <Card.Body>
          <div>
            <label className="block text-text-medium font-medium mb-3">
              Upload CV (PDF)
            </label>
            <FileUpload
              onUpload={handleCVUpload}
              accept=".pdf,application/pdf"
              currentUrl={formData.cvUrl}
            />
            {formData.cvUrl && (
              <div className="mt-4">
                <a
                  href={formData.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/80 transition-colors text-sm"
                >
                  View Current CV →
                </a>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={saving}
          icon={<FloppyDisk weight="bold" />}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default ProfileEditor;
