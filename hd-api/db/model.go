package db

import (
	"time"

	"gorm.io/gorm"
)

type Hospital struct {
	gorm.Model
	Name    string
	Address string
	Number  int32
	Rating  float64
	Doctors []Doctor `gorm:"foreignkey:HospitalID"`
}

type Doctor struct {
	ID         uint   `gorm:"auto_increment"`
	TokenID    string `gorm:"primary_key"`
	Name       string
	HospitalID uint32 `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Degree     string
	Speciality string
	Number     int32
	Experience int32
	Slots      []Slot `gorm:"foreignkey:DoctorID"`
}

type Slot struct {
	gorm.Model
	DoctorID  string `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Start     time.Time
	End       time.Time
	Capacity  int32
	Available int32
}
