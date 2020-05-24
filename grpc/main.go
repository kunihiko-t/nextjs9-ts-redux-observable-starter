package main

import (
	"context"
	"log"
	"net"

	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	"github.com/kunihiko-t/nextjs9-ts-redux-observable-starter/grpc/models"
	"github.com/kunihiko-t/nextjs9-ts-redux-observable-starter/grpc/pb"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type server struct{}

type Validator interface {
	Validate() error
}

// unary
func ServerValidationUnaryInterceptor(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (resp interface{}, err error) {
	if r, ok := req.(Validator); ok {
		if err := r.Validate(); err != nil {
			return nil, status.Error(codes.InvalidArgument, err.Error())
		}
	}
	return handler(ctx, req)
}

func (s *server) GetTodos(_ context.Context, _ *pb.Empty) (*pb.Todos, error) {
	var todos []*pb.Todo
	for _, v := range models.GetTodos() {
		todos = append(todos, &pb.Todo{Id: v.ID.String, Text: v.Text.String, Done: v.Done.Bool})
	}
	return &pb.Todos{TodoList: todos}, nil
}

func (*server) CreateTodo(_ context.Context, req *pb.TodoCreateRequest) (*pb.Todo, error) {
	todo := models.CreateTodo(req.Text)
	return &pb.Todo{Id: todo.ID.String, Text: todo.Text.String, Done: todo.Done.Bool}, nil
}

func (*server) UpdateTodo(_ context.Context, req *pb.TodoUpdateRequest) (*pb.Todo, error) {
	todo := models.UpdateTodo(req.Id, req.Done)
	return &pb.Todo{Id: todo.ID.String, Text: todo.Text.String, Done: todo.Done.Bool}, nil
}

func main() {
	lis, err := net.Listen("tcp", ":50052")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	s := grpc.NewServer(
		grpc.UnaryInterceptor(grpc_middleware.ChainUnaryServer(
			ServerValidationUnaryInterceptor,
		)),
	)
	pb.RegisterTodoServiceServer(s, &server{})

	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
