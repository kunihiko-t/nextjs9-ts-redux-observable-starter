package models

import (
	"database/sql"

	"github.com/google/uuid"
	"github.com/jinzhu/gorm"
	"github.com/kunihiko-t/nextjs9-ts-redux-observable-starter/grpc/utils"
)

var db *gorm.DB

// Todo type
type Todo struct {
	ID   sql.NullString
	Text sql.NullString
	Done sql.NullBool
}

func loadDB() {
	var err error
	db = utils.GetDB()
	if err != nil {
		panic(err)
	}
	env := utils.GetEnv()
	if env == "development" {
		db.LogMode(true)
	}
}

func init() {
	loadDB()
}

func GetTodos() []Todo {
	var todos []Todo
	db.Find(&todos)
	return todos
}

func CreateTodo(text string) Todo {
	randomObj, _ := uuid.NewRandom()
	todo := Todo{
		ID:   sql.NullString{String: randomObj.String(), Valid: true},
		Text: sql.NullString{String: text, Valid: true},
		Done: sql.NullBool{Bool: false, Valid: true},
	}
	db.Create(&todo)
	return todo
}
