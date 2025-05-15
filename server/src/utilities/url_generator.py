import random
from src.services.psql_service import PsqlServices

ALLOWED_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
URL_LENGTH = 7

def generate_random_url():
    return ''.join([random.choice(ALLOWED_CHARS) for i in range(URL_LENGTH)])

def is_unique_url(url):
    bin_count = PsqlServices.get_bin_id(url)
    return bin_count == None

def get_new_url():
    while (True):
        new_url = generate_random_url()
        if (is_unique_url(new_url)):
            return new_url
        else:
            continue
