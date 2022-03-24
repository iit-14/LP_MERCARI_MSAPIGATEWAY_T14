package db

import (
	"errors"

	"gorm.io/gorm"
)

func(s *Slot) BeforeUpdate(tx *gorm.DB) (err error) {
	if s.Available == 0 {
		err = errors.New("slot is full")
		return
	}
	return
}
