// import express.js library
import express from "express";

// create router export variable
const router = express.Router();
export default router;

// import
import employees, {
  addEmployee,
  getEmployeeById,
  getRandomEmployee,
} from "#db/employees";

router
  .get("/:id", (req, res) => {
    res.send(employees);
  })
  .post((req, res) => {
    if (!req.body) return res.status(400).send("Request body is missing");

    const { name } = req.body;
    if (!name) return res.status(400).send("A name is required");

    const employee = addEmployee(name);

    res.status(201).send(employee);
  });

router.get("/:id", (req, res) => {
  const employee = getRandomEmployee();
  res.send(employee);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const employee = getEmployeeById(+id);
  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});
