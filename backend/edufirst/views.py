from django.shortcuts import render
from django.http import HttpResponse


def debug_homeview(request):
    return render(request, 'debug-base.html')


def integration_test_view(request):
    return render(request, 'index.html')