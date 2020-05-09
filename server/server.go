package main

import (
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	"github.com/kunihiko-t/nextjs9-ts-redux-observable-starter/server/gqlgen-todos/graph"
	"github.com/kunihiko-t/nextjs9-ts-redux-observable-starter/server/gqlgen-todos/graph/generated"
	"github.com/rs/cors"
)

const defaultPort = "8080"

func getServer() *handler.Server {
	srv := handler.New(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))

	upgrader := websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		// Add this lines
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	srv.AddTransport(
		&transport.Websocket{Upgrader: upgrader,
			KeepAlivePingInterval: 10 * time.Second,
		})

	srv.AddTransport(transport.Options{})
	srv.AddTransport(transport.GET{})
	srv.AddTransport(transport.POST{})
	srv.AddTransport(transport.MultipartForm{})

	srv.SetQueryCache(lru.New(1000))

	srv.Use(extension.Introspection{})
	srv.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New(100),
	})
	return srv
}

func main() {
	router := chi.NewRouter()
	router.Use(cors.AllowAll().Handler)

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}
	srv := getServer()

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
