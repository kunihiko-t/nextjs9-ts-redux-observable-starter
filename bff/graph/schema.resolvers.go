package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/99designs/gqlgen/graphql"
	"github.com/kunihiko-t/nextjs9-ts-redux-observable-starter/bff/gqlgen-todos/graph/generated"
	"github.com/kunihiko-t/nextjs9-ts-redux-observable-starter/bff/gqlgen-todos/graph/model"
	"github.com/kunihiko-t/nextjs9-ts-redux-observable-starter/bff/gqlgen-todos/pb"
	"github.com/vektah/gqlparser/v2/ast"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

func (r *mutationResolver) CreateTodo(ctx context.Context, input model.NewTodo) (*model.Todo, error) {
	err := input.Validate()
	if err != nil {
		var path ast.Path
		path = graphql.GetFieldContext(ctx).Path()
		path = append(path, ast.PathName("text"))
		return nil, gqlerror.ErrorPathf(path, err.Error())
	}

	client := pb.NewTodoServiceClient(conn)
	todoRequest := pb.TodoCreateRequest{Text: input.Text}
	res, err := client.CreateTodo(ctx, &todoRequest)
	if err != nil {
		return nil, err
	}
	todo := &model.Todo{
		Text: res.GetText(),
		ID:   res.GetId(),
		Done: res.GetDone(),
	}

	if r.c != nil {
		r.c <- todo
	}

	return todo, nil
}

func (r *mutationResolver) ChangeStatus(ctx context.Context, id string, isDone bool) (*model.Todo, error) {
	client := pb.NewTodoServiceClient(conn)
	todoRequest := pb.TodoUpdateRequest{Id: id, Done: isDone}
	res, err := client.UpdateTodo(ctx, &todoRequest)
	if err != nil {
		return nil, err
	}
	todo := &model.Todo{
		Text: res.GetText(),
		ID:   res.GetId(),
		Done: res.GetDone(),
	}

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
	var results []*model.Todo
	for _, v := range res.GetTodoList() {
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
