package main

import (
	"flag"
	"fmt"
	"hd-api/db"
	"hd-api/router"
	"hd-api/util"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

var (
	port = flag.Int("port", 3005, "The server port")
)

func main() {
	util.LoadEnv()
	pg, err := db.InitDb()
	if err != nil {
		log.Fatalf("error connecting to database: %v", err)
	}
	flag.Parse()

	app := fiber.New()

	doctor := fiber.New()
	doctor.Post("/", router.RegisterDoctor(pg))
	doctor.Get("/:id", router.GetDoctorWithID(pg))
	app.Mount("/doctor", doctor)

	slot := fiber.New()
	slot.Post("/", router.AddDoctorSlot(pg))
	slot.Get("/:id", router.GetDoctorSlots(pg))
	slot.Put("/:id", router.UpdateDoctorSlot(pg))
	app.Mount("/slot", slot)

	hospital := fiber.New()
	hospital.Get("/", router.GetHospitals(pg))
	hospital.Get("/:id", router.GetHospitalWithId(pg))
	hospital.Get("/:id/:speciality", router.GetHospitalDoctorWithSpeciality(pg))
	hospital.Get("/:id/doctor", router.GetHospitalDoctor(pg))
	app.Mount("/hospoital", hospital)

	app.Use(logger.New())
	app.Listen(fmt.Sprintf(":%d", *port))
}
