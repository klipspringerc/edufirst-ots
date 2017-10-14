# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    certificate = models.CharField(max_length=50, default='')

    def get_username(self):
        return self.user.username

    def __unicode__(self):
        return self.user.username + "-" + self.certificate
