package graph

import (
	"log"
	"os"

	"google.golang.org/grpc"
)

var conn *grpc.ClientConn

func init() {
	url := getGrpcURL()
	con, err := grpc.Dial(url, grpc.WithInsecure())
	conn = con
	if err != nil {
		log.Fatal("client connection error:", err)
	}
	// TODO close
}

func getGrpcURL() string {
	url := os.Getenv("GPRC_URL")
	if url == "" {
		url = "127.0.0.1:50052"
	}

	return url
}
