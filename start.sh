#!/bin/bash

ENV_FILE=".env"

# Ask user for input and return the response
ask() {
    local prompt="$1"
    local response
    read -r -p "$prompt" response
    echo "$response"
}

# Check if .env file exists and that it contains the necessary values
if [ -f "$ENV_FILE" ]; then
    echo ".env file already created."
    if grep -q "^DB_HOST=" "$ENV_FILE" && grep -q "^DB_PORT=" "$ENV_FILE" && grep -q "^DB_DATABASE=" "$ENV_FILE" && grep -q "^DB_USER=" "$ENV_FILE" && grep -q "^DB_PASSWORD=" "$ENV_FILE"; then
        echo "Required values are already set in the .env file."
    else
        echo "Some values are missing from the .env file. Enter the values using the prompts below."
    fi
else
    echo "Creating .env file..."
fi

# Ask for the necessary values and write them to the .env file
if ! grep -q "^DB_HOST=" "$ENV_FILE"; then
    echo "DB_HOST=db" >> "$ENV_FILE"
fi

if ! grep -q "^DB_PORT=" "$ENV_FILE"; then
    db_port=$(ask "Enter the database port (e.g., 5432): ")
    echo "DB_PORT=$db_port" >> "$ENV_FILE"
fi

if ! grep -q "^DB_DATABASE=" "$ENV_FILE"; then
    db_database=$(ask "Enter the database name (e.g., library): ")
    echo "DB_DATABASE=$db_database" >> "$ENV_FILE"
fi

if ! grep -q "^DB_USER=" "$ENV_FILE"; then
    db_user=$(ask "Enter the database username (e.g., postgres): ")
    echo "DB_USER=$db_user" >> "$ENV_FILE"
fi

if ! grep -q "^DB_PASSWORD=" "$ENV_FILE"; then
    db_password=$(ask "Enter the database password (e.g., superSecretPassword): ")
    echo "DB_PASSWORD=$db_password" >> "$ENV_FILE"
fi

if ! grep -q "^SQLALCHEMY_DATABASE_URI=" "$ENV_FILE"; then
    source "$ENV_FILE"
    db_user="$DB_USER"
    db_password="$DB_PASSWORD"
    db_host="$DB_HOST"
    db_port="$DB_PORT"
    db_database="$DB_DATABASE"
    echo "SQLALCHEMY_DATABASE_URI=postgresql://$db_user:$db_password@$db_host:$db_port/$db_database" >> "$ENV_FILE"
fi

echo "The .env file is ready."

# Start the application
echo "Starting docker-compose..."
docker-compose up --build
