import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  MenuItem,
} from '@mui/material';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    property_type: '',
    status: '',
    min_price: '',
    max_price: '',
    bedrooms: '',
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      let url = 'http://localhost:8000/api/properties/';
      if (Object.values(filters).some(value => value !== '')) {
        url += 'search/';
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });
        url += `?${params.toString()}`;
      }
      const response = await axios.get(url);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    fetchProperties();
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <TextField
              select
              fullWidth
              label="Property Type"
              name="property_type"
              value={filters.property_type}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="House">House</MenuItem>
              <MenuItem value="Apartment">Apartment</MenuItem>
              <MenuItem value="Condo">Condo</MenuItem>
              <MenuItem value="Townhouse">Townhouse</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="For Sale">For Sale</MenuItem>
              <MenuItem value="For Rent">For Rent</MenuItem>
              <MenuItem value="Sold">Sold</MenuItem>
              <MenuItem value="Rented">Rented</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Min Price"
              name="min_price"
              type="number"
              value={filters.min_price}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Max Price"
              name="max_price"
              type="number"
              value={filters.max_price}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Bedrooms"
              name="bedrooms"
              type="number"
              value={filters.bedrooms}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSearch}
              sx={{ height: '56px' }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={4}>
        {properties.map((property) => (
          <Grid item key={property.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={property.images[0] || 'https://via.placeholder.com/400x200'}
                alt={property.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {property.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${property.price.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {property.bedrooms} beds • {property.bathrooms} baths • {property.square_feet} sqft
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {property.address}
                </Typography>
                <Button
                  component={Link}
                  to={`/property/${property.id}`}
                  variant="contained"
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PropertyList; 