package controllers

import (
	"hd-api/db"

	"gorm.io/gorm"
)

func GetHospitals(pg *gorm.DB) ([]*db.Hospital, error) {
	hospitals := []*db.Hospital{}
	tx := pg.Find(hospitals).Select("id", "name", "address", "number", "rating")
	if tx.Error != nil {
		return nil, tx.Error
	}

	return hospitals, nil
}

func GetHospitalWithId(pg *gorm.DB, id uint) (*db.Hospital, error) {
	hospital := &db.Hospital{}
	tx := pg.Where("id = ?", id).Find(hospital)
	if tx.Error != nil {
		return nil, tx.Error
	}

	return hospital, nil
}

func GetHospitalDoctorWithSpeciality(pg *gorm.DB, hospitalId int, speciality string) ([]*db.Doctor, error) {
	doctors := []*db.Doctor{}
	tx := pg.Where("hospital_id = ? AND speciality = ?", hospitalId, speciality).Find(&doctors)
	if tx.Error != nil {
		return nil, tx.Error
	}

	return doctors, nil
}

func GetHospitalDoctors(pg *gorm.DB, hospitalId int) ([]*db.Doctor, error) {
	doctors := []*db.Doctor{}
	tx := pg.Where("hospital_id = ?", hospitalId).Find(&doctors)
	if tx.Error != nil {
		return nil, tx.Error
	}

	return doctors, nil
}
