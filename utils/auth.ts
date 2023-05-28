import * as jwt from "jsonwebtoken";
import * as mongoose from "mongoose";
import { Request, Response } from "express";


type MyToken = {
  email: string
  iat: number
  exp: number
}

export const generateToken = email =>
  !email
    ? null
    : `${jwt.sign(
        {

          email: email,
          iat: Math.floor(Date.now() / 1000) - 30,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60
        },
       process.env.SECRET
      )}`;

const getToken = (req: Request) => {
  let key: string = req.headers['pivo-key'] as string;
  if (
   
    !key ||
    key.trim().length === 0
  ) {
    return null;
  }
 
  return key;
};

const deriveError = (err) => {
    const message = 'Invalid key';
    return {
      status: 401,
      message,
    };
  };

const checkAuth = async (req: Request & { user: string }) => {
  const key = getToken(req);
  let error = null;
  try {
    if (key) {
    
  
   
    } else {
      error = {
        status: 401,
        message: "No authorisation header"
      };
    }
  } catch (err) {
    error = deriveError(err);
  }
  return error;
};

/**
 * Authenticates a request by checking the authorization header. If successful,
 * it adds the user object to the request object and allows the request to
 * proceed. Else, it returns a 401 error with the appropriate message.
 *
 * @param req Request
 * @param res Response
 * @param next
 * @returns {Promise<*>}
 */
const authenticate = async (req: Request & { user: string }, res: Response, next) => {
  const error = await checkAuth(req);
  if (!error) {
    return next();
  }
  return res.status(401).json(error);
};

export default authenticate;
