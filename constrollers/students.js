const fs = require('fs')
const data = require('../data.json')
const {date} = require ("../utils")
const Intl = require ("intl")

exports.index = function(req,res){

    return res.render('students/index',{students : data.students})
}

exports.show = function(req,res){
    const {id} = req.params

    const foundStudent = data.students.find(function(student){
        return student.id == id
    })
    if(!foundStudent) return res.send("Student is not found")

    
    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).birthDay        

    }

    return res.render ("students/show",{student})
}

exports.create = function(req,res){
    return res.render('students/create')
}

exports.post = function(req,res){

    const keys = Object.keys(req.body)
    //verificando se alguma area estiver vazia 
    for(key of keys){
        if(req.body[key] == ""){
            return res.send("Por favor,preencha todos os campos")
        }
    }

    birth = Date.parse(req.body.birth)

     let id = 1

     const lastStudent = data.students[data.students.length - 1]

     if (lastStudent){
        id = lastStudent.id + 1
     }
     
    data.students.push({
        id,
        ...req.body,               
        birth 
    })
    fs.writeFile("data.json", JSON.stringify(data, null, 2),function(err){
        
        if(err) return res.send("Erro de escrita")

        return res.redirect("/students")

    })

    //return res.send(req.body)
}

exports.edit = function(req,res){
    
    const {id} = req.params

    const foundStudent = data.students.find(function(student){
        return student.id == id
    })
    if(!foundStudent) return res.send("Student is not found")

    const student = {
        ...foundStudent,
        birth:date(foundStudent.birth).iso
    }
    

    return res.render('students/edit',{student})
}

exports.put = function(req,res){
    const {id} = req.body

    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex){
        if (id == student.id){
            index = foundIndex
            return true
        }
    })
    if(!foundStudent) return res.send("Student is not found")

    const student = {        
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
        
    }
    data.students[index] = student

    fs.writeFile("data.json",JSON.stringify(data,null,2),function(err){
        if(err) return res.send("Write error")

        return res.redirect(`/students/${id}`)
    })
}

exports.delete = function(req,res){
    const {id} = req.body

    const filteredStudents = data.students.filter(function(student){

        return student.id != id
    })
    data.students = filteredStudents

    fs.writeFile("data.json",JSON.stringify(data,null,2),function(err){

        if(err) return res.send("Professor não encontrado")

        return res.redirect("/students")
    })
}