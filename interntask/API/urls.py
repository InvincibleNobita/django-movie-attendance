from django.conf.urls import url, include
from API import views

urlpatterns = [
    url(r'^movies/$', views.moviesApiCall),
    url(r'^movies/([0-9]+)$',views.moviesApiCall),
    url(r'attendance/$', views.attendanceApiCall),
    url(r'^attendance/([0-9]+)$',views.attendanceApiCall),
    
]