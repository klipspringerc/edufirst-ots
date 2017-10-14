# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib import admin
from posts.models import Topic, Post


admin.site.register(Topic)
admin.site.register(Post)
