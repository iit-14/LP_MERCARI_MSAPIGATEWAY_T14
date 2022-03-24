package router

import (
	"hd-api/controllers"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func GetHospitals(pg *gorm.DB) func(ctx *fiber.Ctx) error {
	return func(ctx *fiber.Ctx) error {
		hospitals, err := controllers.GetHospitals(pg)
		if err != nil {
			return err
		}
		return ctx.JSON(hospitals)
	}
}

func GetHospitalWithId(pg *gorm.DB) func(ctx *fiber.Ctx) error {
	return func(ctx *fiber.Ctx) error {
		id, err := strconv.Atoi(ctx.Params("id"))
		if err != nil {
			return err
		}
		hospital, err := controllers.GetHospitalWithId(pg, uint(id))
		if err != nil {
			return err
		}

		if hospital != nil {
			return ctx.JSON(hospital)
		}

		return ctx.SendStatus(404)
	}
}

func GetHospitalDoctorWithSpeciality(pg *gorm.DB) func(ctx *fiber.Ctx) error {
	return func(ctx *fiber.Ctx) error {
		hospitalId, err := strconv.Atoi(ctx.Params("id"))
		if err != nil {
			return err
		}
		speciality := ctx.Params("speciality")
		doctors, err := controllers.GetHospitalDoctorWithSpeciality(pg, hospitalId, speciality)
		if err != nil {
			return err
		}

		if doctors != nil {
			return ctx.JSON(doctors)
		}

		return ctx.SendStatus(404)
	}
}

func GetHospitalDoctor(pg *gorm.DB) func(ctx *fiber.Ctx) error {
	return func(ctx *fiber.Ctx) error {
		hospitalId, err := strconv.Atoi(ctx.Params("id"))
		if err != nil {
			return err
		}
		doctors, err := controllers.GetHospitalDoctors(pg, hospitalId)
		if err != nil {
			return err
		}

		if doctors != nil {
			return ctx.JSON(doctors)
		}

		return ctx.SendStatus(404)
	}
}
