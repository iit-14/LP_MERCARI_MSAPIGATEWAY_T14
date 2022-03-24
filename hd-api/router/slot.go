package router

import (
	"hd-api/controllers"
	"hd-api/db"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func GetDoctorSlots(pg *gorm.DB) func(ctx *fiber.Ctx) error {
	return func(ctx *fiber.Ctx) error {
		doctorID, err := strconv.Atoi(ctx.Params("id"))
		if err != nil {
			return err
		}
		slot, err := controllers.GetDoctorSlot(pg, doctorID)
		if err != nil {
			return err
		}
		return ctx.JSON(slot)
	}
}

func AddDoctorSlot(pg *gorm.DB) func(ctx *fiber.Ctx) error {
	return func(ctx *fiber.Ctx) error {
		headers := ctx.GetReqHeaders()
		doctorID := headers["Authorization"]

		slot := &db.Slot{}
		slot.DoctorID = doctorID
		if err := ctx.BodyParser(slot); err != nil {
			return err
		}
		if err := controllers.AddDoctorSlot(pg, slot); err != nil {
			return err
		}
		return ctx.SendStatus(201)
	}
}

func UpdateDoctorSlot(pg *gorm.DB) func(ctx *fiber.Ctx) error {
	return func(ctx *fiber.Ctx) error {
		headers := ctx.GetReqHeaders()
		doctorID := headers["Authorization"]

		slot := &db.Slot{}
		slot.DoctorID = doctorID
		if err := ctx.BodyParser(slot); err != nil {
			return err
		}
		if err := controllers.UpdateDoctorSlot(pg, slot); err != nil {
			return err
		}
		return ctx.SendStatus(204)
	}
}
