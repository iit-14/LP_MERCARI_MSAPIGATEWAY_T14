package controllers

import (
	"hd-api/db"

	"gorm.io/gorm"
)

func GetDoctorSlot(pg *gorm.DB, doctorId int) (*db.Slot, error) {
	slot := &db.Slot{}
	tx := pg.Where("id = ?", doctorId).First(slot)
	if tx.Error != nil {
		return nil, tx.Error
	}
	return slot, nil
}

func AddDoctorSlot(pg *gorm.DB, slot *db.Slot) error {
	return pg.Create(slot).Error
}

func UpdateDoctorSlot(pg *gorm.DB, slot *db.Slot) error {
	return pg.Model(slot).Update("available", slot.Available - 1).Error
}
