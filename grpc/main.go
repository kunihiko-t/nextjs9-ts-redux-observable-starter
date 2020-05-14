package main

import (
	"context"
	"log"
	"net"

	"github.com/kunihiko-t/nextjs9-ts-redux-observable-starter/grpc/models"
	"github.com/kunihiko-t/nextjs9-ts-redux-observable-starter/grpc/pb"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type server struct{}

func (s *server) GetTodos(context.Context, *pb.Empty) (*pb.Todos, error) {
	todos := []*pb.Todo{}
	for _, v := range models.GetTodos() {
		todos = append(todos, &pb.Todo{Id: v.ID.String, Text: v.Text.String, Done: v.Done.Bool})
	}
	return &pb.Todos{TodoList: todos}, nil
}

func (*server) CreateTodo(context.Context, *TodoRequest) (*Todo, error) {
	todo = models.CreateTodo(TodoRequest.text)

	return todo, nil
}

func (*server) UpdateTodo(context.Context, *pb.Todo) (*pb.Todo, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UpdateTodo not implemented")
}

func main() {
	lis, err := net.Listen("tcp", ":50052")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterTodoServiceServer(s, &server{})

	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
