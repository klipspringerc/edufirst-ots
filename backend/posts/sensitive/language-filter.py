import re


def language_filter(post_content):
    # generate list of sensitive words
    sensitive_words = []
    with open("swearWords.txt") as word_list_file:
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


print(language_filter("test shIt one two one test sHit"))
