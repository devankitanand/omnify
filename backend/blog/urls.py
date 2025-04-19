from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogPostViewSet, SignupView, CustomAuthToken

router = DefaultRouter()
router.register(r'blogs', BlogPostViewSet, basename='blogpost')

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', CustomAuthToken.as_view(), name='login'),
    path('', include(router.urls)),
]
