package utils

import (
	"fmt"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"github.com/kylelemons/go-gypsy/yaml"
)

const (
	goEnv      = "GO_ENV"
	defaultEnv = "development"
	dbPath     = "./dbconf.yml"
)

// GetEnv returns an environment
func GetEnv() string {
	env := os.Getenv(goEnv)
	if env == "" {
		return defaultEnv
	} else {
		return env
	}
}

// GetDB establishes a DB connection
func GetDB() (db *gorm.DB) {
	env := GetEnv()
	config, err := getDBConf()
	if err != nil {
		fmt.Println("got an unexpected error reading the database.toml file:")
		panic(err)
	}
	driver, _ := config.Get(env + ".driver")
	open, _ := config.Get(env + ".open")
	fmt.Println("connecting to database specified by dbconf.yml.", fmt.Sprint(driver), fmt.Sprint(open))
	db, err = gorm.Open(fmt.Sprint(driver), fmt.Sprint(open))
	if err != nil {
		fmt.Println("got an unexpected error reading the database.toml file:")
		panic(err)
	}
	return
}
func getDBConf() (config *yaml.File, err error) {
	config, err = yaml.ReadFile(getDBConfigFile())
	return
}

// modify path for subdirectory test
func getDBConfigFile() string {
	_, err := os.Stat(dbPath)
	if err == nil {
		return dbPath
	} else {
		return "." + dbPath
	}
}
