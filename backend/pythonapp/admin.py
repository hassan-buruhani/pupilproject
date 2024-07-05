from django.contrib import admin
from . models import CustomUser, Question, Quiz, QuizAttempt

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Question)
admin.site.register(Quiz)
admin.site.register(QuizAttempt)