import { promises as fs } from 'fs';
import { HttpError } from '../utils/httpError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const checkUserId = catchAsync(async (req, res, next) => {
 
  const { id } = req.params;

  // TEMP save user to the DB
  const usersDB = await fs.readFile('data.json');

  const users = JSON.parse(usersDB);

  const user = users.find((u) => u.id === id);

  if (!user) {
    throw new HttpError(404, 'user not found..')
  }

  req.user = user;

  next();

});

export const checkCreateUserData = {};
