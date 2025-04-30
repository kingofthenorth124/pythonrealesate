import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/properties/${id}/`);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };
    fetchProperty();
  }, [id]);

  if (!property) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            {property.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {property.address}
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Chip
              label={property.status}
              color={property.status === 'For Sale' ? 'primary' : 'secondary'}
              sx={{ mr: 1 }}
            />
            <Chip label={property.property_type} variant="outlined" />
          </Box>
          
          <Card sx={{ mb: 4 }}>
            <CardMedia
              component="img"
              height="400"
              image={property.images[0] || 'https://via.placeholder.com/800x400'}
              alt={property.title}
            />
          </Card>

          {property.video_url && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Property Video
              </Typography>
              <Paper>
                <iframe
                  width="100%"
                  height="400"
                  src={property.video_url}
                  title="Property Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Paper>
            </Box>
          )}

          <Typography variant="h6" gutterBottom>
            Description
          </Typography>
          <Typography paragraph>
            {property.description}
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, mb: 4 }}>
            <Typography variant="h4" color="primary" gutterBottom>
              ${property.price.toLocaleString()}
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <BedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${property.bedrooms} Bedrooms`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <BathtubIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${property.bathrooms} Bathrooms`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SquareFootIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${property.square_feet.toLocaleString()} Square Feet`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocalParkingIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${property.parking_spaces} Parking Spaces`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CalendarTodayIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`Built in ${property.year_built}`}
                />
              </ListItem>
            </List>
          </Card>

          {property.amenities && property.amenities.length > 0 && (
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Amenities
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {property.amenities.map((amenity, index) => (
                  <Chip key={index} label={amenity} variant="outlined" />
                ))}
              </Box>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PropertyDetail; 
 