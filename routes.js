const express = require('express')
const routes = express.Router()
const teachers = require('./constrollers/teachers')
const students = require('./constrollers/students')

routes.get("/",function(req,res){

    return res.redirect('/teachers')
})

routes.get("/teachers",teachers.index)
routes.get('/teachers/create',teachers.create)
routes.get('/teachers/:id',teachers.show)
routes.get('/teachers/:id/edit',teachers.edit)
//object = constructor e ele é uma function q cria um objeto para mim
routes.post('/teachers', teachers.post)
routes.put('/teachers',teachers.put)
routes.delete("/teachers",teachers.delete)


/*STUDENTS*/

routes.get("/students",students.index)

routes.get('/students/create',students.create)
routes.get('/students/:id',students.show)

routes.get('/students/:id/edit',students.edit)
//object = constructor e ele é uma function q cria um objeto para mim
routes.post('/students', students.post)
routes.put('/students',students.put)
routes.delete("/students",students.delete)



module.exports = routes