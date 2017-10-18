# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib import admin
from posts.models import Topic, Post, Answer, Comment


admin.site.register(Topic)
admin.site.register(Post)
admin.site.register(Answer)
admin.site.register(Comment)
