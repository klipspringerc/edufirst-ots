# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
from django.shortcuts import render, redirect
from django.utils import timezone
from django.http import HttpResponse, JsonResponse
from posts.models import Post, Topic, Answer, Comment
from posts.serializers import PostSerializer, PostOverviewSerializer, TopicSerializer

# Create your views here.


def create_view(request):
    if request.method == 'POST':
        if request.user.is_authenticated():
            title = request.POST['title']
            body = request.POST['body']
            if title and body:
                post = Post()
                post.title = title
                post.body = body
                post.pub_date = timezone.datetime.now()
                post.author = request.user
                post.save()
                return JsonResponse({"status": "success", "message": "post created", "post_id": post.pk}, status=201)
            else:
                return JsonResponse({"status": "failure", "message": "title and post body cannot be empty"}, status=406)
        else:
            return JsonResponse({"status": "failure", "message": "user need to login"}, status=403)
    else:
        return render(request, 'posts/create-postd.html')


def all_posts_view(request):
    posts = Post.objects.order_by('-votes_total')
    return render(request, 'posts/post-overview.html', {'posts': posts})


def create_answer_view(request, post_id):
    if request.method == 'POST':
        post = Post.objects.get(pk=post_id)
        if request.user.is_authenticated():
            if post:
                answer = Answer()
                answer.body = request.POST['body']
                answer.pub_date = timezone.datetime.now()
                answer.post = post
                answer.author = request.user
                answer.save()
                return JsonResponse({"status": "success", "message": "answer created", "answer_id": answer.pk}, status=201)
            else:
                return JsonResponse({"status": "failure", "message": "post not exist"}, status=404)
        else:
            return JsonResponse({"status": "failure", "message": "user need to login"}, status=403)
    else:
        return render(request, 'posts/create-answerd.html', {'post_id': post_id})


def create_comment_view(request, post_id):
    if request.method == 'POST':
        post = Post.objects.get(pk=post_id)
        if request.user.is_authenticated():
            if post:
                comment = Comment()
                comment.body = request.POST['body']
                comment.pub_date = timezone.datetime.now()
                comment.post = post
                comment.author = request.user
                comment.save()
                return JsonResponse({"status": "success", "message": "answer created", "comment_id": comment.pk},
                                    status=201)
            else:
                return JsonResponse({"status": "failure", "message": "post not exist"}, status=404)
        else:
            return JsonResponse({"status": "failure", "message": "user need to login"}, status=403)
    else:
        return render(request, 'posts/create-commentd.html', {'post_id': post_id})


def search_view(request):
    # if request.method == 'POST':
    #     key
    return HttpResponse("search result")


def post_detail_jsonview(request, post_id):
    try:
        post = Post.objects.get(pk=post_id)
    except Post.DoesNotExist:
        return HttpResponse(status=404)
    serializer = PostSerializer(post)
    return JsonResponse(serializer.data, safe=False)


def all_topics_view(request):
    topics = Topic.objects.order_by('name')
    serializer = TopicSerializer(topics, many=True)
    return JsonResponse(serializer.data, safe=False)


def posts_by_topic_view(request, topic_id):
    match_posts = Post.objects.filter(topics__pk = topic_id)
    serializer = PostOverviewSerializer(match_posts, many=True)
    return JsonResponse(serializer.data, safe=False)


def post_upvote_view(request, post_id):
    try:
        post = Post.objects.get(pk=post_id)
        post.votes_total += 1
        post.save()
        return JsonResponse({"status": "success", "message": "upvote sucessful"}, status=202)
    except Exception:
        return JsonResponse({"status": "failure", "message": "post not exist"}, status=404)


def post_downvote_view(request, post_id):
    try:
        post = Post.objects.get(pk=post_id)
        post.votes_total -= 1
        post.save()
        return JsonResponse({"status": "success", "message": "downvote sucessful"}, status=202)
    except Exception:
        return JsonResponse({"status": "failure", "message": "post not exist"}, status=404)


# def answer_upvote_view(request, anser_id):
