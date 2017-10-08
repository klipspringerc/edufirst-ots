# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.utils import timezone
from django.http import HttpResponse
from posts.models import Post

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
            else:
                return render(request, 'posts/create-postd.html', {'errormsg': 'title and body cannot be empty'})
            return HttpResponse("post created", status=200)
        else:
            return render(request, 'users/logind.html')
    else:
        return render(request, 'posts/create-postd.html')


def all_posts_view(request):
    posts = Post.objects.order_by('votes_total')
    return render(request, 'posts/post-overview.html', {'posts': posts})