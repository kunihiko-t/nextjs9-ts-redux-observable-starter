.PHONY: init
init:
	kubectl apply -f kubernetes/namespace.yaml
	helm repo add stable https://kubernetes-charts.storage.googleapis.com

.PHONY: install-mysql
install-mysql:
	helm upgrade -i -f charts/mysql/values.yaml --namespace sample mysql stable/mysql

.PHONY: migrate-up
migrate-up:
	# https://github.com/golang-migrate/migrate
	migrate -database "mysql://root:root@tcp(127.0.0.1:32000)/sample" -source file://grpc/migrations up

.PHONY: migrate-down
migrate-down:
	# https://github.com/golang-migrate/migrate
	migrate -database "mysql://root:root@tcp(127.0.0.1:32000)/sample" -source file://grpc/migrations down