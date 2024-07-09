from django.db import models
from django.contrib.auth.models import User

class Class(models.Model):
    name = models.CharField(max_length=50)
    class_teacher = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Pupil(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10)
    date_reported = models.DateField(auto_now_add=True)
    address = models.TextField()
    nida_id = models.CharField(max_length=20, unique=True)
    status = models.CharField(max_length=10, default='active')
    current_class = models.ForeignKey(Class, on_delete=models.SET_DEFAULT, default=1)
    picture = models.ImageField(upload_to='pupil_pictures/', blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Guardian(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    phone_number = models.CharField(max_length=15)
    nida_id = models.CharField(max_length=20, unique=True)
    relationship = models.CharField(max_length=20)
    pupil = models.ForeignKey(Pupil, on_delete=models.CASCADE)
    picture = models.ImageField(upload_to='guardian_pictures/', blank=True, null=True)

    def __str__(self):
        return self.name

class Enrollment(models.Model):
    pupil = models.ForeignKey(Pupil, on_delete=models.CASCADE)
    class_assigned = models.ForeignKey(Class, on_delete=models.CASCADE)
    enrollment_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.pupil} enrolled in {self.class_assigned}"
