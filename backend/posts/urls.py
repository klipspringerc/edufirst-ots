from django.conf.urls import url
from .views import create_view, all_posts_view, post_detail_jsonview, post_downvote_view, post_upvote_view, \
    posts_by_topic_view, search_view, create_answer_view, create_comment_view, search_debug_view, post_detail_view

app_name = 'posts'

urlpatterns = [
    url('^$', create_view, name="create"),
    url(r'^all/$', all_posts_view),
    url(r'^search/$', search_view, name="search"),
    url(r'^search-debug/$', search_debug_view, name="searchdebug"),
    url(r'(?P<post_id>[0-9]+)/$', post_detail_jsonview, name='postdetail'),
    url(r'(?P<post_id>[0-9]+)/detail/$', post_detail_view, name='postdetaildebug'),
    url(r'(?P<post_id>[0-9]+)/answer/$', create_answer_view, name='createanswer'),
    url(r'(?P<post_id>[0-9]+)/comment/$', create_comment_view, name='createcomment'),
    url(r'(?P<post_id>[0-9]+)/upvote/$', post_upvote_view, name='upvotepost'),
    url(r'(?P<post_id>[0-9]+)/downvote/$', post_downvote_view, name='downvotepost'),
    url(r'topic/(?P<topic_id>[a-zA-Z]+)/$', posts_by_topic_view, name='postbytopic'),
]
