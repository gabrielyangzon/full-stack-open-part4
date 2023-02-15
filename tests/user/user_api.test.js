const mongoose = require('mongoose')
const supertest = require("supertest");

const app = require('../../app')
const api = supertest(app)
const User = require('../../models/users')
const helper = require('./user_helper.test')

const bcrypt = require('bcryptjs')
beforeEach(async () => {
    await User.deleteMany({})

    for(let user of helper.initialUser){

        user.password = await bcrypt.hash(user.password,10)
        const newUser = new User(user)
        await newUser.save()
    }
})

describe('user can be fetched' , () => {
    test("users are returned as json" , async () => {
            await api
                .get('/api/users')
                .expect(200)
                .expect('Content-Type', /application\/json/)
    })


    test("users count is two" , async () => {
        const response = await api.get('/api/users')

        expect(response.body).toHaveLength(helper.initialUser.length)
    })
})


describe('new user can be added' ,  () => {
    test('user add test ' ,  async () => {

        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username : "testuser" ,
            name : "testname" ,
            password : "1234"
        }

         await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        let usersAfterAdd = await helper.usersInDb()

        console.log(usersAfterAdd)

        expect(usersAfterAdd).toHaveLength(usersAtStart.length+1)

        let usernames = usersAfterAdd.map(us => us.username)

        expect(usernames).toContain(newUser.username)

    })

    test('creation will fail if username already taken' , async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username : "gabsue" ,
            name : "testname" ,
            password : "1234"
        }

       const result = await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('expected `username` to be unique')

        const usersAtEnd = await helper.usersInDb()

        expect(usersAtEnd).toEqual(usersAtStart)

    })
})

afterAll(async () => {
    await mongoose.connection.close()
})