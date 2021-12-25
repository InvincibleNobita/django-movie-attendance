from django.db import models

# Create your models here.

class Movies(models.Model):
    MovieId = models.AutoField(primary_key=True)
    MovieName= models.CharField(max_length=150)
    

class Attendance(models.Model):
    SeatNo=models.AutoField(primary_key=True)
    MovieName= models.CharField(max_length=100)
    Date = models.DateField()
    AttendeeFirstName = models.CharField(max_length=100)
    AttendeeSecondName = models.CharField(max_length=100)
    