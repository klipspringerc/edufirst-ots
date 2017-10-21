from django.conf.urls import url
from .views import signup_view, login_view, logout_view, user_posts_view, user_posts_debug_view

app_name = 'users'

urlpatterns = [
    url(r'^signup/$', signup_view, name='signup'),
    url(r'^login/$', login_view, name='login'),
    url(r'^logout/$', logout_view, name='logout'),
    url(r'^(?P<user_id>[a-zA-Z0-9]+)/posts/$', user_posts_view, name='posts'),
    url(r'^(?P<user_id>[a-zA-Z0-9]+)/posts-debug/$', user_posts_debug_view, name='postsdebug'),
]