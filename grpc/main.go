package main

import (
	"context"
	"log"
	"net"

	"github.com/kunihiko-t/nextjs9-ts-redux-observable-starter/grpc/models"
	"github.com/kunihiko-t/nextjs9-ts-redux-observable-starter/grpc/todo"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type server struct{}

func (s *server) GetTodos(context.Context, *todo.Empty) (*todo.Todos, error) {
	todos := []*todo.Todo{}
	for _, v := range models.GetTodos() {
		todos = append(todos, &todo.Todo{Id: v.ID.String, Text: v.Text.String, Done: v.Done.Bool})
	}
	return &todo.Todos{Todo: todos}, nil
}

func (*server) UpdateTodo(context.Context, *todo.Todo) (*todo.Todo, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UpdateTodo not implemented")
}

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	s := grpc.NewServer()
	todo.RegisterTodoServiceServer(s, &server{})

	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
