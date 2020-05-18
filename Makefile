.PHONY: init
init:
	kubectl apply -f kubernetes/namespace.yaml
	helm repo add stable https://kubernetes-charts.storage.googleapis.com

.PHONY: install-mysql
install-mysql:
	helm upgrade -i -f charts/mysql/values.yaml --namespace sample mysql stable/mysql --wait

.PHONY: migrate-up
migrate-up:
	# https://github.com/golang-migrate/migrate
	migrate -database "mysql://root:root@tcp(127.0.0.1:32000)/sample" -source file://grpc/migrations up

.PHONY: migrate-down
migrate-down:
	# https://github.com/golang-migrate/migrate
	migrate -database "mysql://root:root@tcp(127.0.0.1:32000)/sample" -source file://grpc/migrations down

# brew install protobuf
# go get -u google.golang.org/grpc
# go get -u github.com/golang/protobuf/protoc-gen-go
# go get github.com/envoyproxy/protoc-gen-validate
.PHONY: generate-from-proto
generate-from-proto:
	protoc --proto_path=${GOPATH}/src \
		--proto_path ${GOPATH}/src/github.com/envoyproxy/protoc-gen-validate \
		--proto_path=protobuf \
		--go_out=plugins=grpc:./grpc/pb \
		--validate_out="lang=go:./grpc/pb" \
		./protobuf/todo.proto
	protoc --proto_path=${GOPATH}/src \
		--proto_path ${GOPATH}/src/github.com/envoyproxy/protoc-gen-validate \
		--proto_path=protobuf \
		--go_out=plugins=grpc:./bff/pb \
		--validate_out="lang=go:./bff/pb" \
		./protobuf/todo.proto

.PHONY: run-next
run-next:
	docker build . -t next
	kubectl apply -f kubernetes/namespace.yaml
	kubectl apply -f kubernetes/next/

.PHONY: stop-next
stop-next:
	docker build . -t next
	kubectl delete -f kubernetes/namespace.yaml
	kubectl delete -f kubernetes/next/

.PHONY: cleanup
cleanup:
	kubectl delete -f kubernetes/namespace.yaml
