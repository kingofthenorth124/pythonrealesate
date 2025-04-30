import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
} from '@mui/material';

const AddProperty = () => {
  const navigate = useNavigate();
  const [property, setProperty] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    square_feet: '',
    property_type: '',
    status: '',
    year_built: '',
    parking_spaces: '',
    images: [],
    video_url: '',
    virtual_tour_url: '',
    amenities: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert amenities string to array
      const formattedProperty = {
        ...property,
        amenities: property.amenities.split(',').map(item => item.trim()),
        images: property.images ? property.images.split(',').map(url => url.trim()) : [],
        price: parseFloat(property.price),
        bedrooms: parseInt(property.bedrooms),
        bathrooms: parseFloat(property.bathrooms),
        square_feet: parseFloat(property.square_feet),
        year_built: parseInt(property.year_built),
        parking_spaces: parseInt(property.parking_spaces),
      };

      await axios.post('http://localhost:8000/api/properties/', formattedProperty);
      navigate('/');
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add New Property
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Title"
                name="title"
                value={property.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={property.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                label="Price"
                name="price"
                value={property.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Address"
                name="address"
                value={property.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                select
                label="Property Type"
                name="property_type"
                value={property.property_type}
                onChange={handleChange}
              >
                <MenuItem value="House">House</MenuItem>
                <MenuItem value="Apartment">Apartment</MenuItem>
                <MenuItem value="Condo">Condo</MenuItem>
                <MenuItem value="Townhouse">Townhouse</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                select
                label="Status"
                name="status"
                value={property.status}
                onChange={handleChange}
              >
                <MenuItem value="For Sale">For Sale</MenuItem>
                <MenuItem value="For Rent">For Rent</MenuItem>
                <MenuItem value="Sold">Sold</MenuItem>
                <MenuItem value="Rented">Rented</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                type="number"
                label="Bedrooms"
                name="bedrooms"
                value={property.bedrooms}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                type="number"
                label="Bathrooms"
                name="bathrooms"
                value={property.bathrooms}
                onChange={handleChange}
                inputProps={{ step: "0.5" }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                type="number"
                label="Square Feet"
                name="square_feet"
                value={property.square_feet}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Year Built"
                name="year_built"
                value={property.year_built}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Parking Spaces"
                name="parking_spaces"
                value={property.parking_spaces}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Images URLs (comma-separated)"
                name="images"
                value={property.images}
                onChange={handleChange}
                helperText="Enter image URLs separated by commas"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Video URL"
                name="video_url"
                value={property.video_url}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Virtual Tour URL"
                name="virtual_tour_url"
                value={property.virtual_tour_url}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Amenities (comma-separated)"
                name="amenities"
                value={property.amenities}
                onChange={handleChange}
                helperText="Enter amenities separated by commas"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
              >
                Add Property
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddProperty; 