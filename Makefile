.PHONY: init
init:
	kubectl apply -f kubernetes/charts/namespace.yaml

.PHONY: install-mysql
install-mysql:
	helm upgrade -i -f charts/mysql/values.yaml --namespace sample mysql stable/mysql

.PHONY: migrate
migrate:
	# https://github.com/golang-migrate/migrate
	migrate -database "mysql://root:root@tcp(127.0.0.1:32000)/sample" -source file://grpc/migrations up
