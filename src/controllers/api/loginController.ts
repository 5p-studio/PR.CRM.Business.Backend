import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import { json } from 'sequelize/types';
import  User from '@database/model/employees';
const jwt = require('jsonwebtoken');



const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");




class LoginController {
  public async index (req: Request, res: Response) {
      
      
    try {
      var Email = req.body.email;
      var password = req.body.password;
      var users = await User.findOne({where:{email : Email}});
      //res.send(users);
      if(users == null){
        console.log("ko co user!");
        sendError(res,404, "not found");
      }
      else{
        if(users.password == password){
          let payload = { id: users.id };
          let token = jwt.sign(payload, 'khoabimat');
          res.json({ message: 'ok', jwt: token });
        }
        else{
          console.log('sai pass');
          sendError(res,404, "not found");
        }
        
      }
    
      
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new LoginController();