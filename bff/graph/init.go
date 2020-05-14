package graph

import (
	"google.golang.org/grpc"
	"log"
)

var conn *grpc.ClientConn
func init(){
	con, err := grpc.Dial("127.0.0.1:50052", grpc.WithInsecure())
	conn = con
	if err != nil {
		log.Fatal("client connection error:", err)
	}
	// TODO close
}