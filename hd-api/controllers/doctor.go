package controllers

import (
	"hd-api/db"

	"gorm.io/gorm"
)

func RegisterDoctor(pg *gorm.DB, req *db.Doctor) error {
	return pg.Create(req).Error
}

func GetDoctorWithId(pg *gorm.DB, id string) (*db.Doctor, error) {
	doctor := &db.Doctor{}
	tx := pg.Where("id = ?", id).Omit("token_id").Find(doctor)
	if tx.Error != nil {
		return nil, tx.Error
	}

	return doctor, nil
}
