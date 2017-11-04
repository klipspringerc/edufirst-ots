from django.conf.urls import url
from wolf.views import wolf_search_view, wolf_search_debug_view, wolf_search_combined_view

app_name = 'wolf'

urlpatterns = [
    url(r'^search/$', wolf_search_view, name="search"),
    url(r'^search-debug/$', wolf_search_debug_view, name="debug"),
    url(r'^search-combined/$', wolf_search_combined_view, name="search-combined")
]
