import psycopg2

class PsqlServices:
  def get_bins():
    connection = psycopg2.connect(dbname='request_bin')

    try:
      with connection:
        with connection.cursor() as cursor:
          cursor.execute("SELECT mongodb_doc_id FROM request")
          result = cursor.fetchall()
    finally:
      connection.close()

    return result

  def get_bin_id(url):
    connection = psycopg2.connect(dbname='request_bin')

    try:
      with connection:
        with connection.cursor() as cursor:
          cursor.execute("SELECT id FROM Bin WHERE path=%s", (url,))
          result = cursor.fetchone()
    finally:
      connection.close()

    return result