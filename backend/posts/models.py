# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from users.models import Account
# Create your models here.


class Topic(models.Model):
    class Meta:
        app_label = 'posts'
    name = models.CharField(max_length=40, primary_key=True)

    def __unicode__(self):
        return self.name


class Post(models.Model):
    class Meta:
        app_label = 'posts'
    title = models.CharField(max_length=100)
    body = models.TextField()
    pub_date = models.DateTimeField()
    author = models.ForeignKey(User)
    votes_total = models.IntegerField(default=0)
    topics = models.ManyToManyField(Topic)

    def pub_date_pretty(self):
        return self.pub_date.strftime('%b %e %Y')

    def get_answers(self):
        answers = Answer.objects.filter(post=self)
        return answers

    def get_author_name(self):
        return self.author.username

    def get_author_info(self):
        account = self.author.account
        return account

    def get_top_answer(self):
        return Answer.objects.filter(post__id = self.id).order_by('-votes_total')[0]


    def __unicode__(self):
        return self.title[:30]


class Answer(models.Model):
    class Meta:
        app_label = 'posts'
    body = models.TextField(default='')
    pub_date = models.DateTimeField()
    author = models.ForeignKey(User)
    post = models.ForeignKey(Post, related_name='answers', on_delete=models.CASCADE)
    votes_total = models.IntegerField(default=0)

    def pub_date_pretty(self):
        return self.pub_date.strftime('%b %e %Y')

    def __unicode__(self):
        return self.body[:30]

    def get_author_info(self):
        account = self.author.account
        return account


class Comment(models.Model):
    class Meta:
        app_label = 'posts'

    body = models.TextField(default='')
    pub_date = models.DateTimeField()
    author = models.ForeignKey(User)
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)

    def __unicode__(self):
        return self.body[:30]

    def get_author_info(self):
        account = self.author.account
        return account