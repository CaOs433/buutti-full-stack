# Full-Stack Book Collection App

A full-stack application with React frontend to browse, edit, add & delete books in a database.
The server is a simple python flask app and it's Dockerized with a PostgreSQL database.

## Installation

To run the app, you need to have Docker installed and running.

Then just run the `start.sh` script to start the app.

You need a .env (environment variables file named `.env`) to run the application:

```bash
# Database configuration:
DB_HOST=db  # This must be the same as in `compose.yaml`
DB_PORT=5432
DB_DATABASE=library
DB_USER=postgres
DB_PASSWORD=REPLACE_WITH_YOUR_OWN_PASSWORD  # Just put some password, it will be automatically created

SQLALCHEMY_DATABASE_URI=postgresql://USER:PASWORD@HOST:PORT/DATABASE
```

This will be generated with the `start.sh` script for a quick setup. It asks for the `.env` values
and creates/updates the file if it's not already created with the necessary values.
Finally it runs `docker compose up --build`.

The app will be available at <http://localhost:3000>.

The server will be available at port `5000`. You can see some example requests in the `Requests.http` file.
If you can't access `localhost:5000` then try `127.0.0.1:5000` (you need to also add `/books` to the url).

(You can use a Visual Studio Code extension for making the requests directly from the file.
See REST Client: <https://marketplace.visualstudio.com/items?itemName=humao.rest-client>).


### Running independently

For instructions for the React app - see [frontend/README.md](./frontend/README.md).

To run the server app locally you only need `python` and `pip` (**and of course a database**).

The server app can be installed with `pip install --no-cache-dir -r requirements.txt`.

Then you can start the app with `python app.py`.

It is recommend to use an virtual environment (venv) to run a Python app.

Depending of your operating system, you may need to install some other python packages.
See the Dockerfile for reference of a Linux based os.


## Testing

There's some primitive tests done for the React app, but still work in progress.
You can run them with `yarn test`.

For the server app: work in progress...
