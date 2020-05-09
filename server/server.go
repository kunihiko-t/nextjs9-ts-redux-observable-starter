package main

import (
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/kunihiko-t/nextjs9-ts-redux-observable-starter/server/gqlgen-todos/graph"
	"github.com/kunihiko-t/nextjs9-ts-redux-observable-starter/server/gqlgen-todos/graph/generated"
	"github.com/rs/cors"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))
	upgrader := websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		// Add this lines
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	srv.AddTransport(&transport.Websocket{Upgrader: upgrader})

	mux := http.NewServeMux()

	mux.Handle("/", playground.Handler("GraphQL playground", "/query"))
	mux.Handle("/query", srv)

	handler := cors.AllowAll().Handler(mux)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
