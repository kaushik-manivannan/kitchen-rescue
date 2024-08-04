import React, { useRef } from "react";
import { Camera } from "react-camera-pro";
import { Button } from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';

interface CameraMethods {
  takePhoto: () => string | null;
}

interface ImageCaptureProps {
  image: string | null;
  onCapture: (image: string) => void;
}

const ImageCapture: React.FC<ImageCaptureProps> = ({ image, onCapture }) => {
  const camera = useRef<CameraMethods | null>(null);

  const handleCapture = () => {
    if (camera.current) {
      const photo = camera.current.takePhoto();
      if (photo) {
        onCapture(photo);
      }
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {!image && (
        <>
          <Camera
            ref={camera as React.RefObject<CameraMethods>}
            facingMode="environment"
            errorMessages={{
              noCameraAccessible: 'Oops! No camera found. Check your device or try a different browser.',
              permissionDenied: 'Camera shy? Please refresh and allow camera access to continue your inventory rescue!',
              switchCamera: 'Sorry, we can\'t switch cameras. There\'s only one video device available.',
              canvas: 'Your browser doesn\'t support this feature. Try updating or switching browsers.'
            }}
          />
          <Button
            onClick={handleCapture}
            variant="contained"
            color="secondary"
            startIcon={<CameraAltIcon />}
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000
            }}
          >
            Capture
          </Button>
        </>
      )}
      {image && (
        <img src={image} alt='New inventory item' style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      )}
    </div>
  );
};

export default ImageCapture;