import pytest


def match_score(keyword_tokens, matched_tokens, factor):
    score = 0
    keyword_set = set(keyword_tokens)
    for token in matched_tokens:
        if token in keyword_set:
            score += 1
    return score / pow(len(matched_tokens), factor)


@pytest.fixture
def search_tokens():
    return ['Aaa', 'Bbb', 'Ccc', 'Ddd']


@pytest.fixture
def post_token_list():
    return [['Aaa', 'Bbb'], ['Aaa', 'Bbb', 'Eee'], ['Aaa', 'Fff']]


def test__rank_score(search_tokens, post_token_list):
    score_1 = match_score(search_tokens, post_token_list[0], 0.5)
    score_2 = match_score(search_tokens, post_token_list[1], 0.5)
    score_3 = match_score(search_tokens, post_token_list[2], 0.5)
    assert score_1 > score_2
    assert score_2 > score_3