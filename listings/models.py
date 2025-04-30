from django.db import models
from mongoengine import Document, StringField, FloatField, IntField, ListField, URLField, DateTimeField
from django.utils import timezone

# Create your models here.

class Property(Document):
    title = StringField(required=True, max_length=200)
    description = StringField(required=True)
    price = FloatField(required=True)
    address = StringField(required=True)
    bedrooms = IntField(required=True)
    bathrooms = FloatField(required=True)
    square_feet = FloatField(required=True)
    property_type = StringField(required=True, choices=['House', 'Apartment', 'Condo', 'Townhouse'])
    status = StringField(required=True, choices=['For Sale', 'For Rent', 'Sold', 'Rented'])
    
    # Media fields
    images = ListField(URLField())
    video_url = URLField(required=False)
    virtual_tour_url = URLField(required=False)
    
    # Additional details
    year_built = IntField()
    parking_spaces = IntField(default=0)
    amenities = ListField(StringField())
    
    # Metadata
    created_at = DateTimeField(default=timezone.now)
    updated_at = DateTimeField(default=timezone.now)
    
    meta = {
        'collection': 'properties',
        'indexes': [
            'property_type',
            'status',
            'price',
            'bedrooms'
        ]
    }
    
    def __str__(self):
        return self.title
