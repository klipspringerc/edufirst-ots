from posts.models import Topic


def populate_topics():
    topic = Topic(name='Algorithm')
    topic.save()

