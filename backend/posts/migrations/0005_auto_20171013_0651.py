# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-13 06:51
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_answer_body'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='posts.Post'),
        ),
    ]
