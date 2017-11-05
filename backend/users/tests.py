# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from django.test import Client
from django.contrib.auth.models import User
from users.models import Account


class TestAuth(TestCase):

    def setUp(self):
        self.client = Client()
        self.username = 'tester_auth'
        self.email = 'test@test.com'
        self.password = 'test'
        self.test_user = User.objects.create_user(self.username, self.email, self.password)

    def test_auth(self):
        response = self.client.post('/api/v1/users/login/', {"username": self.username, "password": "notcorrect"})
        self.assertEqual(response.status_code, 406, "password test failed " + str(response.status_code))
        response = self.client.post('/api/v1/users/login/', {"username": "notexist", "password": "notcorrect"})
        self.assertEqual(response.status_code, 406, "username test failed")
        response = self.client.post('/api/v1/users/login/', {"username": self.username, "password": self.password})
        self.assertEqual(response.status_code, 200, "login test failed")
        self.assertEqual(response.json()["message"], 'login successful', "login test failed")
        response = self.client.post('/api/v1/users/logout/')
        self.assertEqual(response.status_code, 200, "logout test failed")
        self.assertEqual(response.json()["message"], 'logout successful', "login test failed")

    def test_signup(self):
        username = "tester_auth2"
        password = "test"
        response = self.client.post('/api/v1/users/signup/', {"username": username, "password1": password, "password2": "notsame"})
        self.assertEqual(response.status_code, 406, "password test failed " + str(response.status_code))
        response = self.client.post('/api/v1/users/signup/', {"username": username, "password1": password, "password2": password})
        self.assertEqual(response.status_code, 201, "signup test failed " + str(response.status_code))
        user = User.objects.get(username=username)
        account = Account.objects.get(user=user)
        self.assertIsNotNone(account, "account creation failed")
        self.assertEquals(account.get_username(), username, "account creation failed")



