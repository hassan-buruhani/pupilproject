from django.urls import path
from . import views

urlpatterns = [
    path('pupils/', views.pupil_list, name='pupil_list'),
    path('pupils/<int:pk>/', views.pupil_detail, name='pupil_detail'),
    path('classes/', views.class_list, name='class_list'),
    path('classes/<int:pk>/', views.class_detail, name='class_detail'),
    path('guardians/', views.guardian_list, name='guardian_list'),
    path('guardians/<int:pk>/', views.guardian_detail, name='guardian_detail'),
    path('enrollments/', views.enrollment_list, name='enrollment_list'),
    path('enrollments/<int:pk>/', views.enrollment_detail, name='enrollment_detail'),
    path('login/', views.login_view, name='login'),
    path('pupil-count/', views.pupil_count, name='pupil-count'),
    path('class-count/', views.class_count, name='class-count'),
]
