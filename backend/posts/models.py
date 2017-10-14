# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Topic(models.Model):
    class Meta:
        app_label = 'posts'
    name = models.CharField(max_length=40)


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

