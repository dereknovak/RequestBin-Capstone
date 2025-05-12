## Setup
Installing all package dependencies:
```
poetry install
```
---

Make sure mongod server is active locally. You can find instructions on how to do so here: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/#std-label-install-mdb-community-ubuntu 

Here are the most important commands. To start the `mongod` process:
```
sudo systemctl start mongod
```
To ensure that it'll start by itself following a system reboot:
```
sudo systemctl enable mongod
```
To verify the status of the `mongod` local server:
```
sudo systemctl status mongod
```
Once it's active you are good to go.

---

Make sure PostgreSQL (version 16+) in installed and running locally. Run the following commands in this order:
```
createdb request_bin
psql -d request_bin < request_bin.sql
```
