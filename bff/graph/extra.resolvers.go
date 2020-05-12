package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/kunihiko-t/nextjs9-ts-redux-observable-starter/bff/gqlgen-todos/graph/generated"
	"github.com/kunihiko-t/nextjs9-ts-redux-observable-starter/bff/gqlgen-todos/graph/model"
)

func (r *subscriptionResolver) Todo(ctx context.Context) (<-chan *model.Todo, error) {
	event := make(chan *model.Todo)

	r.c = event

	return event, nil
}

// Subscription returns generated.SubscriptionResolver implementation.
func (r *Resolver) Subscription() generated.SubscriptionResolver { return &subscriptionResolver{r} }

type subscriptionResolver struct{ *Resolver }
