from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Pupil, Class, Guardian, Enrollment
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import PupilSerializer, ClassSerializer, GuardianSerializer, EnrollmentSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def pupil_list(request):
    if request.method == 'GET':
        pupils = Pupil.objects.all()
        serializer = PupilSerializer(pupils, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = PupilSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def pupil_count(request):
    count = Pupil.objects.count()
    return Response({'count': count})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def class_count(request):
    count = Class.objects.count()
    return Response({'count': count})

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def pupil_detail(request, pk):
    try:
        pupil = Pupil.objects.get(pk=pk)
    except Pupil.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PupilSerializer(pupil)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = PupilSerializer(pupil, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        pupil.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Similar views can be created for Class, Guardian, and Enrollment models.
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def class_list(request):
    if request.method == 'GET':
        classes = Class.objects.all()
        serializer = ClassSerializer(classes, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ClassSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def class_detail(request, pk):
    try:
        class_obj = Class.objects.get(pk=pk)
    except Class.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ClassSerializer(class_obj)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ClassSerializer(class_obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        class_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def guardian_list(request):
    if request.method == 'GET':
        guardians = Guardian.objects.all()
        serializer = GuardianSerializer(guardians, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = GuardianSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def guardian_detail(request, pk):
    try:
        guardian = Guardian.objects.get(pk=pk)
    except Guardian.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = GuardianSerializer(guardian)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = GuardianSerializer(guardian, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        guardian.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def enrollment_list(request):
    if request.method == 'GET':
        enrollments = Enrollment.objects.all()
        serializer = EnrollmentSerializer(enrollments, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = EnrollmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def enrollment_detail(request, pk):
    try:
        enrollment = Enrollment.objects.get(pk=pk)
    except Enrollment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EnrollmentSerializer(enrollment)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = EnrollmentSerializer(enrollment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        enrollment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
