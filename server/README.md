## Setup

Installing all package dependencies:
```
poetry install
```
---

Make sure mongod server is active locally. You can find instructions on how to do so here: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/#std-label-install-mdb-community-ubuntu 

Here are the most important commands from above. The examples use Ubuntu, so modify for your current environment.

To start the `mongod` process:

Start
```
sudo systemctl start mongod
```

Ensure that it'll start by itself following a system reboot:
```
sudo systemctl enable mongod
```

Verify the status of the `mongod` local server:
```
sudo systemctl status mongod
```
Once it's active and running on port 27017 you are good to go.

---

Make sure PostgreSQL (version 16+) in installed and running locally. From the root project directory, run the following commands in this order:

```
psql -d request_bin < tests/reset_sql_db.sql
```

---

To start the application:

```
poetry run python app.py
```
