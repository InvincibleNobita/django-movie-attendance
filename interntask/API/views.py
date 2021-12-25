from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from API.models import Movies, Attendance
from API.serializers import MoviesSerializer, AttendanceSerializer

from django.core.files.storage import default_storage
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

# Create your views here.

@csrf_exempt
def moviesApiCall(request,id=0):
    if request.method == 'GET':
        #if id != 0: then only show that movie
        movies = Movies.objects.all()
        movies_serializer= MoviesSerializer(movies, many=True)
        return JsonResponse(movies_serializer.data, safe=False)
    elif request.method == 'POST':
        movies_data = JSONParser().parse(request)
        movies_serializer= MoviesSerializer(data=movies_data)
        if movies_serializer.is_valid():
            movies_serializer.save()
            return JsonResponse("Data added successfully!", safe=False)
        return JsonResponse("Failed!", safe=False)
    elif request.method == 'PUT':
        movies_data = JSONParser().parse(request)
        movies = Movies.objects.get(MovieId= movies_data['MovieId'])
        movies_serializer= MoviesSerializer(movies, data=movies_data)
        if movies_serializer.is_valid():
            movies_serializer.save()
            return JsonResponse("Data Updated successfully!", safe=False)
        return JsonResponse("Failed!", safe=False)
    elif request.method == 'DELETE':
        movies=Movies.objects.get(MovieId=id)
        movies.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)

@csrf_exempt
def attendanceApiCall(request,id=0):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    if request.method == 'GET':
        #if id != 0: then only show that movie
        attendance = Attendance.objects.all()
        attendance_serializer= AttendanceSerializer(attendance, many=True)
        return JsonResponse(attendance_serializer.data, safe=False)
    elif request.method == 'POST':
        attendance_data = JSONParser().parse(request)
        attendance_serializer= AttendanceSerializer(data=attendance_data)
        if attendance_serializer.is_valid():
            attendance_serializer.save()
            return JsonResponse("Data added successfully!", safe=False)
        return JsonResponse("Failed!", safe=False)
    elif request.method == 'PUT':
        attendance_data = JSONParser().parse(request)
        attendance = Attendance.objects.get(SeatNo= attendance_data['SeatNo'])
        #print(attendance)
        attendance_serializer= AttendanceSerializer(attendance, data=attendance_data)
        if attendance_serializer.is_valid():
            attendance_serializer.save()
            return JsonResponse("Data Updated successfully!", safe=False)
        return JsonResponse("Failed!", safe=False)
    elif request.method == 'DELETE':
        attendance=Attendance.objects.get(SeatNo=id)
        attendance.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)
'''  
@csrf_exempt
def SaveFile(request):
    file = request.FILES['uploadedFile']
'''
