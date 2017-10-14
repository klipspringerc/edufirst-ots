from django.conf.urls import url
from .views import create_view, all_posts_view, post_detail_jsonview, post_downvote_view, post_upvote_view, posts_by_topic_view, search_view

app_name = 'posts'

urlpatterns = [
    url('^$', create_view, name="create"),
    url(r'^all', all_posts_view),
    url(r'^search', search_view, name="search"),
    url(r'(?P<post_id>[0-9]+)', post_detail_jsonview, name='postdetail'),
    url(r'(?P<post_id>[0-9]+)/upvote', post_upvote_view, name='upvotepost'),
    url(r'(?P<post_id>[0-9]+)/downvote', post_downvote_view, name='downvotepost'),
    url(r'topic/(?P<topic_id>[a-zA-Z]+)', posts_by_topic_view, name='postbytopic'),
]
