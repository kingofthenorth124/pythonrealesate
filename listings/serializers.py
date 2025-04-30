from rest_framework import serializers
from .models import Property

class PropertySerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    title = serializers.CharField(max_length=200)
    description = serializers.CharField()
    price = serializers.FloatField()
    address = serializers.CharField()
    bedrooms = serializers.IntegerField()
    bathrooms = serializers.FloatField()
    square_feet = serializers.FloatField()
    property_type = serializers.ChoiceField(choices=['House', 'Apartment', 'Condo', 'Townhouse'])
    status = serializers.ChoiceField(choices=['For Sale', 'For Rent', 'Sold', 'Rented'])
    images = serializers.ListField(child=serializers.URLField(), required=False)
    video_url = serializers.URLField(required=False, allow_null=True)
    virtual_tour_url = serializers.URLField(required=False, allow_null=True)
    year_built = serializers.IntegerField(required=False)
    parking_spaces = serializers.IntegerField(required=False, default=0)
    amenities = serializers.ListField(child=serializers.CharField(), required=False)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return Property(**validated_data).save()

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance 