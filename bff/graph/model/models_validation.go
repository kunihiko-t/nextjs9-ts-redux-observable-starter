package model

import validation "github.com/go-ozzo/ozzo-validation"

func (t NewTodo) Validate() error {
	return validation.ValidateStruct(&t,
		validation.Field(&t.Text, validation.Required, validation.Length(0, 20)),
	)
}
