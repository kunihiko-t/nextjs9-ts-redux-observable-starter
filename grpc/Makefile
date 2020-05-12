# brew install protobuf
# go get -u google.golang.org/grpc
# go get -u github.com/golang/protobuf/protoc-gen-go
.PHONY: generate
generate:
	protoc ./todo.proto  --go_out=plugins=grpc:. 
