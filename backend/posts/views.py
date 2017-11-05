# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
from django.shortcuts import render, redirect
from django.utils import timezone
from django.http import HttpResponse, JsonResponse
from posts.models import Post, Topic, Answer, Comment
from posts.serializers import PostSerializer, PostOverviewSerializer, TopicSerializer
from difflib import SequenceMatcher
from django.contrib.auth.models import User
from datetime import datetime, timedelta
# from stemming.porter2 import stem
from posts.sensitive.language_filter import language_filter
from nltk.tokenize import sent_tokenize, word_tokenize
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def create_view(request):
    if request.method == 'POST':
        if request.user.is_authenticated():
            title = request.POST['title']
            body = request.POST['body']
            if title and body:
                post = Post()
                post.title = title
                post.body = language_filter(body)
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


@csrf_exempt
def create_answer_view(request, post_id):
    if request.method == 'POST':
        post = Post.objects.get(pk=post_id)
        if request.user.is_authenticated():
            if post:
                if water_army_detection(request.user):
                    return JsonResponse({"status":"failure", "message": "post too frequent"}, status=403)
                answer = Answer()
                answer.body = language_filter(request.POST['body'])
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


@csrf_exempt
def create_answer_debug_view(request, post_id):
    if request.method == 'POST':
        post = Post.objects.get(pk=post_id)
        if request.user.is_authenticated():
            if post:
                if water_army_detection(request.user):
                    return JsonResponse({"status":"failure", "message": "post too frequent"}, status=403)
                answer = Answer()
                answer.body = language_filter(request.POST['body'])
                answer.pub_date = timezone.datetime.now()
                answer.post = post
                answer.author = request.user
                answer.save()
                answers = Answer.objects.filter(post=post).order_by('-votes_total')
                return render(request, 'posts/post-detail.html', {"post": post, "answers": answers, "post_id": post_id, "errormsg": "answer posted"})
            else:
                # return JsonResponse({"status": "failure", "message": "post not exist"}, status=404)
                answers = Answer.objects.filter(post=post).order_by('-votes_total')
                return render(request, 'posts/post-detail.html', {"post": post, "answers": answers, "post_id": post_id, "errormsg": "post too frequent"})
        else:
            return JsonResponse({"status": "failure", "message": "user need to login"}, status=403)
    else:
        return render(request, 'posts/create-answerd.html', {'post_id': post_id})


@csrf_exempt
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


@csrf_exempt
def search_debug_view(request):
    if request.method == 'POST':
        keyword = request.POST['keywords']
        ranked_result = rank_post(keyword, Post.objects.all())
        return render(request, 'posts/post-search-result.html', {'posts': ranked_result})
    else:
        posts = Post.objects.all()
        return render(request, 'posts/post-overview.html', {'posts': posts})


@csrf_exempt
def search_view(request):
    if request.method == 'POST':
        keyword = request.POST['keywords']
        ranked_result = rank_post(keyword, Post.objects.all())
        serializer = PostOverviewSerializer(ranked_result, many=True)
        return JsonResponse(serializer.data, safe=False)
    else:
        posts = Post.objects.all()
        return render(request, 'posts/post-overview.html', {'posts': posts})


def post_detail_jsonview(request, post_id):
    try:
        post = Post.objects.get(pk=post_id)
    except Post.DoesNotExist:
        return HttpResponse(status=404)
    serializer = PostSerializer(post)
    return JsonResponse(serializer.data, safe=False)


def post_detail_view(request, post_id):
    try:
        post = Post.objects.get(pk=post_id)
    except Post.DoesNotExist:
        return HttpResponse(status=404)
    answers = Answer.objects.filter(post=post)
    return render(request, 'posts/post-detail.html', {'post': post, 'answers': answers, 'post_id': post_id})


def all_topics_view(request):
    topics = Topic.objects.order_by('name')
    serializer = TopicSerializer(topics, many=True)
    return JsonResponse(serializer.data, safe=False)


def posts_by_topic_view(request, topic_id):
    match_posts = Post.objects.filter(topics__pk = topic_id)
    serializer = PostOverviewSerializer(match_posts, many=True)
    return JsonResponse(serializer.data, safe=False)


def list_topics_view(request):
    topics = Topic.objects.order_by('name')
    return render(request, 'posts/list-topics.html', {'topics': topics})


def list_posts_by_topic_view(request, topic_id):
    match_posts = Post.objects.filter(topics__pk=topic_id)
    return render(request, 'posts/posts-by-topic.html', {'topic': topic_id, 'posts': match_posts})


@csrf_exempt
def post_upvote_view(request, post_id):
    try:
        post = Post.objects.get(pk=post_id)
        post.votes_total += 1
        post.save()
        return JsonResponse({"status": "success", "message": "upvote sucessful"}, status=202)
    except Exception:
        return JsonResponse({"status": "failure", "message": "post not exist"}, status=404)


@csrf_exempt
def post_downvote_view(request, post_id):
    try:
        post = Post.objects.get(pk=post_id)
        post.votes_total -= 1
        post.save()
        return JsonResponse({"status": "success", "message": "downvote sucessful"}, status=202)
    except Exception:
        return JsonResponse({"status": "failure", "message": "post not exist"}, status=404)


# def answer_upvote_view(request, anser_id):

def rank_post(search_content, unordered_posts):
    search_tokens = generate_tokens(search_content)
    if len(search_tokens) == 0:
        return []
    similarity_score = [rank_score(search_tokens, post) for post in unordered_posts]
    ordered_posts = [ind_post for ind_score, ind_post in sorted(zip(similarity_score, unordered_posts))]
    ordered_posts.reverse()
    return ordered_posts


def generate_tokens(str):
    words = word_tokenize(str)
    return [word.lower() for word in words if word.isalnum()]


def stem_sentence(str):
    tokens = generate_tokens(str)
    return ' '.join(tokens)


def rank_score(search_tokens, post):
    topic_list = [topic.name.lower() for topic in post.topics.all()]
    topic_score = 0
    for topic in topic_list:
        if topic in search_tokens:
            topic_score = 1
            break
    title_tokens = generate_tokens(post.title)
    title_score = match_score(search_tokens, title_tokens, 0.5)
    body_tokens = generate_tokens(post.body)
    body_score = match_score(search_tokens, body_tokens, 0.3)
    # title_score = SequenceMatcher(None, stem_sentence(search_content), stem_sentence(post.title)).ratio()
    # body_score = SequenceMatcher(None, stem_sentence(search_content), stem_sentence(post.body)).ratio()
    return (title_score * 3 + body_score + topic_score * 2) / 6


def match_score(keyword_tokens, matched_tokens, factor):
    score = 0
    keyword_set = set(keyword_tokens)
    for token in matched_tokens:
        if token in keyword_set:
            score += 1
    return score / pow(len(matched_tokens), factor)


# determine whether a user is a water army
def water_army_detection(user):
    # get current user
    # user = User.objects.get(id=user_id)
    # calculate time limit
    time_limit = datetime.now() - timedelta(minutes=10)
    # get posts
    posts = Post.objects.filter(author=user).filter(pub_date__range=(time_limit, datetime.now()))
    # get comments
    comments = Comment.objects.filter(author=user).filter(pub_date__range=(time_limit, datetime.now()))
    # get answers
    answers = Answer.objects.filter(author=user).filter(pub_date__range=(time_limit, datetime.now()))
    total = posts.count() + comments.count() + answers.count()
    print total
    return total > 8
