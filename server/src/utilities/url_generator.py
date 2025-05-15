import random
from src.services.database_service import DatabaseService

ALLOWED_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
URL_LENGTH = 7

database = DatabaseService()

def generate_random_url():
    return ''.join([random.choice(ALLOWED_CHARS) for i in range(URL_LENGTH)])

def is_unique_url(url):
    db_urls = [record[0] for record in database.get_paths()]

    if url in db_urls:
        return False
    else:
        return True
    

def get_new_url():
    while (True):
        new_url = generate_random_url()
        if (is_unique_url(new_url)):
            return new_url
        else:
            continue

def is_valid_url(url):
    return (len(url) > 7) and (len(url) < 10) and (is_unique_url(url))