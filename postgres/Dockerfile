FROM postgres

ADD /tables/ /docker-entrypoint-initdb.d/tables/ 
ADD /seed/ /docker-entrypoint-initdb.d/seed/ 
# tables is the folder name

ADD deploy_schemas.sql /docker-entrypoint-initdb.d/ 

