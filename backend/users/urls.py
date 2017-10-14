from django.conf.urls import url
from .views import signup_view, login_view, logout_view

app_name = 'users'

urlpatterns = [
    url(r'^signup/', signup_view, name='signup'),
    url(r'^login/', login_view, name='login'),
    url(r'^logout/', logout_view, name='logout'),
]