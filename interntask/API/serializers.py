from django.db import models
from rest_framework import fields, serializers
from API.models import Movies, Attendance

class MoviesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movies
        fields = ('MovieId',
                  'MovieName')

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ('SeatNo',
                  'MovieName',
                  'Date',
                  'AttendeeFirstName',
                  'AttendeeSecondName')

