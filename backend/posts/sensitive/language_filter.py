import re
from edufirst.settings import BASE_DIR
import os


def language_filter(post_content):
    # generate list of sensitive words
    sensitive_words = []
    word_file_path = os.path.join(BASE_DIR, 'static', 'swearWords.txt')
    with open(word_file_path) as word_list_file:
        for word in word_list_file:
            sensitive_words.append(word.strip())
    re_string = '(?=(.))(?:'
    for word in sensitive_words:
        re_string = re_string + word + '|'
    re_string = re_string[:-1]
    re_string = re_string + ')'
    # replace occurrence of sensitive words
    regex = re.compile(re_string, flags=re.IGNORECASE)
    return regex.sub(r'\1***', post_content)
