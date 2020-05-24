package graph

import (
	"github.com/kunihiko-t/nextjs9-ts-redux-observable-starter/bff/gqlgen-todos/graph/model"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	todos []*model.Todo
	c     chan *model.Todo
}
