from posts.models import Post, Topic, Answer, Comment
from rest_framework import serializers
from users.serializers import AccountSerializer


class TopicSerializer(serializers.ModelSerializer):
    topic_name = serializers.CharField(source='name')
    class Meta:
        model = Topic
        fields = ('topic_name',)


class AnswerSerializer(serializers.ModelSerializer):
    author = AccountSerializer(source='get_author_info')
    class Meta:
        model = Answer
        fields = ('id', 'body', 'pub_date', 'author', 'votes_total')


class CommentSerializer(serializers.ModelSerializer):
    author = AccountSerializer(source='get_author_info')
    class Meta:
        model = Comment
        fields = ('id', 'body', 'pub_date', 'author')


class PostSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    author = AccountSerializer(source='get_author_info')
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Post
        fields = ('id', 'title', 'body', 'pub_date', 'author', 'votes_total', 'topics', 'answers', 'comments')


class PostOverviewSerializer(serializers.ModelSerializer):
    top_answer = AnswerSerializer(source='get_top_answer', read_only=True)
    author = AccountSerializer(source='get_author_info')
    class Meta:
        model = Post
        fields = ('id', 'title', 'body', 'pub_date', 'author', 'votes_total', 'top_answer')
