from django.conf.urls import url
from .views import create_view, all_posts_view

app_name = 'posts'

urlpatterns = [
    url('^$', create_view, name="create"),
    url(r'^all', all_posts_view),
]
