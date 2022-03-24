package router

import (
	"hd-api/controllers"
	"hd-api/db"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func RegisterDoctor(pg *gorm.DB) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		d := &db.Doctor{}
		if err := c.BodyParser(d); err != nil {
			return err
		}
		if err := controllers.RegisterDoctor(pg, d); err != nil {
			return err
		}
		return c.SendStatus(201)
	}
}

func GetDoctorWithID(pg *gorm.DB) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		id := c.Params("id")
		doc, err := controllers.GetDoctorWithId(pg, id)
		if err != nil {
			return err
		}

		if doc != nil {
			return c.JSON(doc)
		}

		return c.SendStatus(404)
	}
}
