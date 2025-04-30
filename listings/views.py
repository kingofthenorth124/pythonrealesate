from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Property
from .serializers import PropertySerializer

# Create your views here.

class PropertyViewSet(viewsets.ViewSet):
    def list(self, request):
        properties = Property.objects.all()
        serializer = PropertySerializer(properties, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = PropertySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            property = Property.objects.get(id=pk)
            serializer = PropertySerializer(property)
            return Response(serializer.data)
        except Property.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk=None):
        try:
            property = Property.objects.get(id=pk)
            serializer = PropertySerializer(property, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Property.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        try:
            property = Property.objects.get(id=pk)
            property.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Property.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['GET'])
    def search(self, request):
        query = {}
        
        # Filter by property type
        property_type = request.query_params.get('property_type', None)
        if property_type:
            query['property_type'] = property_type
            
        # Filter by status
        status_filter = request.query_params.get('status', None)
        if status_filter:
            query['status'] = status_filter
            
        # Price range
        min_price = request.query_params.get('min_price', None)
        max_price = request.query_params.get('max_price', None)
        if min_price and max_price:
            query['price__gte'] = float(min_price)
            query['price__lte'] = float(max_price)
            
        # Bedrooms and bathrooms
        beds = request.query_params.get('bedrooms', None)
        if beds:
            query['bedrooms'] = int(beds)
            
        properties = Property.objects(**query)
        serializer = PropertySerializer(properties, many=True)
        return Response(serializer.data)
