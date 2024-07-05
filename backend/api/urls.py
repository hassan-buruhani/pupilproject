from django.urls import path
from pythonapp.views import register, login, quiz_list, quiz_create, quiz_detail, question_create, attempt_quiz, user_attempts, user_profile, get_user_attempts
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('quizzes/', quiz_list, name='quiz_list'),
    path('quizzes/create', quiz_create, name='quiz_create'),
    path('quizzes/<int:pk>/', quiz_detail, name='quiz_detail'),
    path('questions/create/', question_create, name='question_create'),
    path('attempt-quiz/<int:quiz_id>/', attempt_quiz, name='attempt_quiz'),
    path('user-attempts/', get_user_attempts, name='get_user_attempts'),
    path('user-profile/<int:user_id>/', user_profile),
]
 