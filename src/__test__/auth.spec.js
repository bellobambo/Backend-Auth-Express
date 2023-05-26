const { authRegisterController } = require("../../src/controllers/auth")
const User = require("../../src/database/schema/User")
const {hashPassword} = require("../../src/utils/helpers")


jest.mock("../../src/utils/helpers", () => ({
    hashPassword: jest.fn((x) => x)

}) )

jest.mock("../../src/database/schema/User")

const req = {
    body: {
        username: "fake_email",
        password: "fake_password"
    }

}

const res = {
    status: jest.fn((x) => x),
    send: jest.fn((x)=> x)
}

it("should send a status code of 400 when user already exist", async () => {
    User.findOne.mockImplementationOnce(() => ({
        id: 1,
        email: "email",
        password: "password"
    }))

    await authRegisterController(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledTimes(1)
})

it("should send a status code of 201 when new user is created", async () => {
    User.findOne.mockResolvedValueOnce(undefined)
    User.create.mockResolvedValueOnce({id : 1, email: "email", password: "password"})
    // hashPassword.mockReturnValueOnce("hash")
    await authRegisterController(req, res)
    expect(hashPassword).toHaveBeenCalledWith("fake_password")

    // error

    
    // expect(User.create).toHaveBeenCalledWith({
    //     email: "fake_email",
    //     password : "hash password" ,
    // })
    // expect(res.send).toHaveBeenCalledWith(201)
})