package db

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func InitDb() (*gorm.DB, error) {
	dsn := "postgres://mzxsajyhblkpdu:3b4a1620865333142fa86aab77e4f895fab57e77ee6c43c4ba3c8be35910a1c5@ec2-3-229-161-70.compute-1.amazonaws.com:5432/d73clgifibdih4"

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		return nil, err
	}

	db.AutoMigrate(&Hospital{}, &Doctor{}, &Slot{})

	return db, nil
}
