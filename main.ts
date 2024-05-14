#! /usr/bin/env node
import chalk from "chalk";

import inquirer from "inquirer";

class student {
  id: string;
  name: string;
  coursesEnrolled: string[];
  feesAmount: number;

  constructor(
    id: string,
    name: string,
    coursesEnrolled: string[],
    feesAmount: number
  ) {
    this.id = id
    this.name = name
    this.coursesEnrolled = coursesEnrolled
    this.feesAmount = feesAmount
  }
}

let baseId = 10000;
let studentId: string = "";
let continueEnrollment = true;

let students: student[] = []


do{
  let action = await inquirer.prompt({
    type: "list",
    name: "ans",
    message: " Please select an option:\n",
    choices: ["Enroll a student", "show student status"]
  })

  if (action.ans === "Enroll a student") {
    let studentName = await inquirer.prompt({
      type: "input",
      name: "ans",
      message:  "Please Enter your name:"
    })
    let trimedStudentName = (studentName.ans).trim().toLowerCase()
    let studentNameCheck = students.map(obj => obj.name)

    if (studentNameCheck.includes(trimedStudentName) === false) {
      if (trimedStudentName !== "") {
        baseId++
        studentId = "STID" + baseId

        console.log("\n\tYour account has been created");
        console.log(`Welcome, ${trimedStudentName}!`);

        let cource = await inquirer.prompt({
          type: "list",
          name: "ans",
          message:"Please select a course",
          choices: ["IT", "Arabic", "English"]
        })

        let courcefees = 0;
        switch (cource.ans) {
          case "IT":
            courcefees = 5000;
            break;

          case "Arabic":
            courcefees = 3000;
            break;

          case "English":
            courcefees = 2000;
            break;
        }

        let courseconfirm = await inquirer.prompt({
          type: "confirm",
          name: "ans",
          message: "Do you want to enroll in this course"
        })

        if (courseconfirm.ans === true) {
          let Student = new student(
            studentId,
            trimedStudentName,
            [cource.ans],
            courcefees
          );

          students.push(Student);

          console.log(chalk.red.bold(`You have enrolled in this class`));
        }
      } else {
        console.log(chalk.red.bold(`invalid name`));
      }
    } else {
      console.log(chalk.red.bold(`this name is already exists`));
    }
  } else if (action.ans === "show student status") {
    if (students.length !== 0) {
      let studentNameCheck = students.map(e => e.name);

      let selectedStudent = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: chalk.green.bold`Please select name`,
        choices: studentNameCheck,
      });
      let foundstudent = students.find(
        student => student.name === selectedStudent.ans
      );

      console.log("Student information");
      console.log(foundstudent);
      console.log("\n");
    } else {
      console.log(chalk.green.bold`Record is empty`);
    }
  }
  let userConfirm = await inquirer.prompt({
    type: "confirm",
    name: "ans",
    message: "Do you want to continue?",
  });
  if (userConfirm.ans === false) {
    continueEnrollment = false;
  }
} while (continueEnrollment);

console.log(chalk.red.bold(`exit this programe`));
