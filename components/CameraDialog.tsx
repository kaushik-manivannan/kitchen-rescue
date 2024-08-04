import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";
import ImageCapture from "./ImageCapture";
import { identifyItemFromImage } from '@/utils/photoActions';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

interface CameraDialogProps {
  open: boolean;
  onClose: () => void;
  onItemIdentified: (item: { name: string; quantity: string | null }) => void;
}

const CameraDialog: React.FC<CameraDialogProps> = ({ open, onClose, onItemIdentified }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCapture = (capturedImage: string) => {
    setImage(capturedImage);
  };

  const handleAddItem = async () => {
    if (!image) {
      setError("No image captured. Please take a photo first.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const base64Image = image.split(',')[1];
      const identifiedItem = await identifyItemFromImage(base64Image);
      if (identifiedItem) {
        onItemIdentified(identifiedItem);
        onClose();
      } else {
        setError("No item identified in the image. Please try again with a clearer photo.");
      }
    } catch (apiError: any) {
      console.error("API Error:", apiError);
      setError(`API Error: ${apiError.message || 'Unknown error occurred'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ 
        bgcolor: 'primary.main', 
        color: 'primary.contrastText',
        fontWeight: 'bold',
        fontSize: '1.4rem'
      }}>
        Rescue Items with Your Camera!
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mt: 2, mb: 2, fontWeight: 'light' }}>
          Spot a new item for your kitchen arsenal? Snap a photo to quickly add it to your inventory!
        </Typography>
        <Box sx={{ width: '100%', height: '400px', position: 'relative', border: '2px dashed', borderColor: 'secondary.main' }}>
          <ImageCapture image={image} onCapture={handleCapture} />
        </Box>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ bgcolor: 'background.default', p: 2, display: 'flex', justifyContent: 'center' }}>
        <Button onClick={onClose} color="secondary" variant="outlined" sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        {image && (
          <Button onClick={() => setImage(null)} color="primary" variant="contained" sx={{ textTransform: 'none' }}>
            Retake
          </Button>
        )}
        {image && (
          <Button 
            onClick={handleAddItem} 
            color="secondary" 
            variant="contained" 
            sx={{ textTransform: 'none' }}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Add'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CameraDialog;