package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"math/rand"
	"github.com/kunihiko-t/nextjs9-ts-redux-observable-starter/bff/gqlgen-todos/graph/generated"
	"github.com/kunihiko-t/nextjs9-ts-redux-observable-starter/bff/gqlgen-todos/graph/model"
	"github.com/kunihiko-t/nextjs9-ts-redux-observable-starter/bff/gqlgen-todos/pb"
)

func (r *mutationResolver) CreateTodo(ctx context.Context, input model.NewTodo) (*model.Todo, error) {
	todo := &model.Todo{
		Text: input.Text,
		ID:   fmt.Sprintf("T%d", rand.Int()),
	}
	r.todos = append(r.todos, todo)

	if r.c != nil {
		r.c <- todo
	}

	return todo, nil
}

func (r *mutationResolver) ChangeStatus(ctx context.Context, id string, isDone bool) (*model.Todo, error) {
	var todo *model.Todo
	for _, t := range r.todos {
		if t.ID == id {
			todo = t
			break
		}
	}
	if todo == nil {
		return nil, fmt.Errorf("Not found")
	}

	todo.Done = isDone
	if r.c != nil {
		r.c <- todo
	}

	return todo, nil
}

func (r *queryResolver) Todos(ctx context.Context) ([]*model.Todo, error) {
	client := pb.NewTodoServiceClient(conn)
	res, err := client.GetTodos(ctx, &pb.Empty{})
	if err != nil {
		panic(fmt.Errorf("got: %v", err))
	}
	results := []*model.Todo{}
	for _, v := range res.GetTodoList(){
		results = append(results, &model.Todo{ID: v.Id, Text: v.Text, Done: v.Done})
	}
	return results, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
