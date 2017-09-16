import pytest

@pytest.fixture
def data_list():
    return ["user1", "user2"]

def test__demo(data_list):
    assert data_list[0] == "user1"