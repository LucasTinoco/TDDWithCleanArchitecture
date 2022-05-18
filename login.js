const express = require('express')
const router = express.Router()

module.exports = () => {
  const router = new SignUpRouter()
  router.post('/singup', ExpressRouterAdapter.adapt(router))
}

class ExpressRouterAdapter {
  static adapt (req, res) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body
      }
      const httpResponse = router.route(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}

class SignUpRouter {
  async route (httpRequest) {
    const { email, password, repeatPassword } = httpRequest.dody
    const user = new SignUpUseCase().signUp(email, password, repeatPassword)
    return {
      statusCode: 200,
      body: user
    }
  }
}

class SignUpUseCase {
  async signUp (email, password, repeatPassword) {
    if (password === repeatPassword) {
      new AddAcountRepository().add(email, password)
    }
  }
}

const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')

class AddAcountRepository {
  async add (email, password, repeatPassword) {
    const user = await AccountModel.create({ email, password })
    return user
  }
}
