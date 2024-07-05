from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser, Quiz, Question, QuizAttempt, UserProfile
from .serializers import UserSerializer, QuestionSerializer, QuizSerializer, QuizAttemptSerializer, UserProfileSerializer

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    from rest_framework_simplejwt.views import TokenObtainPairView
    return TokenObtainPairView.as_view()(request._request)


@api_view(['GET'])
def quiz_list(request):
    quizzes = Quiz.objects.all()
    serializer = QuizSerializer(quizzes, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def quiz_create(request):
    serializer = QuizSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def quiz_detail(request, pk):
    try:
        quiz = Quiz.objects.get(pk=pk)
    except Quiz.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = QuizSerializer(quiz)
    return Response(serializer.data)

@api_view(['POST'])
def question_create(request):
    serializer = QuestionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def attempt_quiz(request, quiz_id):
    try:
        quiz = Quiz.objects.get(pk=quiz_id)
    except Quiz.DoesNotExist:
        return Response({'error': 'Quiz not found'}, status=status.HTTP_404_NOT_FOUND)

    user = request.user
    answers = request.data.get('answers', {})

    # Calculate score
    score = 0
    total_questions = quiz.questions.count()
    for question in quiz.questions.all():
        user_answer = answers.get(str(question.id))
        if user_answer and user_answer == question.correct_option:
            score += 1

    score_percentage = (score / total_questions) * 100

    # Save attempt
    attempt = QuizAttempt.objects.create(user=user, quiz=quiz, score=score_percentage)

    return Response({
        'score': score_percentage,
        'total_questions': total_questions,
        'correct_answers': score,
        'attempt_id': attempt.id
    })
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_attempts(request):
    user = request.user
    attempts = QuizAttempt.objects.filter(user=user)
    serializer = QuizAttemptSerializer(attempts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def user_attempts(request, user_id):
    attempts = QuizAttempt.objects.filter(user_id=user_id)
    serializer = QuizAttemptSerializer(attempts, many=True)
    return Response(serializer.data)


@api_view(['GET', 'PUT'])
def user_profile(request, user_id):
    try:
        profile = UserProfile.objects.get(user_id=user_id)
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = UserProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)