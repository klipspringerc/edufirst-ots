from django.core.management.base import BaseCommand
from posts.populate import populate_topics


class Command(BaseCommand):

    def _populate_topics(self):
        populate_topics()

    def handle(self, *args, **options):
        self._populate_topics()