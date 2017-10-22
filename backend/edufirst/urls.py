"""edufirst URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from edufirst.views import debug_homeview
from posts.views import all_posts_view, all_topics_view
from wolf.views import wolf_search_view
from edufirst.views import integration_test_view
from . import views
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/users/', include('users.urls')),
    url(r'^api/v1/posts/', include('posts.urls')),
    url(r'^api/v1/topics/', all_topics_view),
    url(r'^api/v1/wolf/', include('wolf.urls')),
    # url(r'^integrate/$', integration_test_view),
    url(r'^overview/', all_posts_view, name="home"),
    url(r'^', views.FrontendAppView.as_view()),
]
