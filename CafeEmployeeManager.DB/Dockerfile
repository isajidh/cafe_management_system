# Use the official MySQL image
FROM mysql:8.0

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=cafe_employee_manager_db
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=root

# Copy the initialization scripts
COPY ./init.sql /docker-entrypoint-initdb.d/

# Expose the MySQL port
EXPOSE 3306
