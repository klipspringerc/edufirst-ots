# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase, Client
from django.contrib.auth.models import User
from posts.models import Post, Answer
from django.utils import timezone


class PostTestCase(TestCase):

    def setUp(self):
        self.client = Client()
        self.username = 'tester1'
        self.email = 'test@test.com'
        self.password = 'test'
        self.test_user = User.objects.create_user(self.username, self.email, self.password)
        self.test_post = Post.objects.create(title="test_post_title", body="test_post_body", pub_date=timezone.now(),
                                   author=self.test_user)

    def test_post_auth(self):
        response = self.client.post('/api/v1/posts/', {'title': 'test_post_title', 'body': 'test_post_body'})
        self.assertEqual(response.status_code, 403, "post authentication failed: " + str(response.status_code))

    def test_post_non_empty(self):
        self.client.login(username=self.username, password=self.password)
        response = self.client.post('/api/v1/posts/', {'title': '', 'body': 'test_post_body'})
        self.assertEqual(response.status_code, 406, "post non-empty check failed: " + str(response.status_code))
        self.client.logout()

    def test_post_made(self):
        self.client.login(username=self.username, password=self.password)
        response = self.client.post('/api/v1/posts/', {'title': 'test_post_title', 'body': 'test_post_body'})
        self.assertEqual(response.status_code, 201, "post creation failed: " + str(response.status_code))
        self.client.logout()

    def test_post_top_answer(self):
        ans_username = 'tester2'
        ans_email = 'test2@test.com'
        ans_password = 'test'
        ans_test_user = User.objects.create_user(ans_username, ans_email, ans_password)
        Answer.objects.create(body="test_answer_body_1", pub_date=timezone.now(), author=ans_test_user, post=self.test_post, votes_total=2)
        Answer.objects.create(body="test_answer_body_2", pub_date=timezone.now(), author=ans_test_user,
                              post=self.test_post, votes_total=3)
        Answer.objects.create(body="test_answer_body_3", pub_date=timezone.now(), author=ans_test_user,
                              post=self.test_post, votes_total=2)
        top_answer = self.test_post.get_top_answer()
        self.assertEqual(top_answer.body, "test_answer_body_2", "post top answer failed")






