import React, { useState, useRef } from 'react';
import { Container, Grid, Paper, Button, Textarea, Loader, Alert, Title, Group, Text, FileInput } from '@mantine/core';
import { IconUpload, IconPhoto } from '@tabler/icons-react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
      setOcrText('');
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    setOcrText('');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setOcrText(response.data.text);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to process image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="lg" py="xl">
      <Title align="center" mb="xl">Handwritten Grading Tool (TrOCR)</Title>
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="md" p="md" withBorder>
            <Title order={5} mb="md">Upload Image</Title>
            
            <FileInput
              ref={fileInputRef}
              placeholder="Click to select image or drag and drop"
              accept="image/png,image/jpeg"
              value={file}
              onChange={handleFileSelect}
              icon={<IconPhoto size={16} />}
              disabled={loading}
              mb="md"
            />
            
            {imageUrl && (
              <div style={{ marginBottom: 16 }}>
                <Text size="sm" weight={500} mb="xs">Preview:</Text>
                <img 
                  src={imageUrl} 
                  alt="Preview" 
                  style={{ 
                    width: '100%', 
                    maxHeight: '300px', 
                    objectFit: 'contain',
                    borderRadius: 8,
                    border: '1px solid #ddd'
                  }} 
                />
              </div>
            )}
            
            <Button 
              fullWidth 
              onClick={handleSubmit} 
              loading={loading} 
              disabled={!file || loading}
              leftIcon={<IconUpload size={16} />}
            >
              {loading ? 'Processing...' : 'Extract Text'}
            </Button>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="md" p="md" withBorder>
            <Title order={5} mb="sm">Extracted Text</Title>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Loader size="lg" />
                <Text mt="md">Processing image with TrOCR...</Text>
              </div>
            ) : (
              <Textarea 
                value={ocrText} 
                minRows={10} 
                readOnly 
                autosize 
                placeholder="OCR result will appear here..." 
              />
            )}
            {error && <Alert color="red" mt="md">{error}</Alert>}
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default App;
