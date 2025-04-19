from rest_framework import serializers
from django.contrib.auth.models import User
from .models import BlogPost

class BlogPostSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')
    
    class Meta:
        model = BlogPost
        fields = ['id', 'author', 'author_username', 'title', 'content', 'published_date', 'updated_date']
        read_only_fields = ['author', 'published_date', 'updated_date']

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
