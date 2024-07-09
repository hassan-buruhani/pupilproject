from django.contrib import admin
from .models import Pupil, Class, Guardian, Enrollment

# Register your models here.
admin.site.register(Pupil)
admin.site.register(Class)
admin.site.register(Guardian)
admin.site.register(Enrollment)
