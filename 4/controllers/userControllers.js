import { v4 } from 'uuid';
import { promises as fs } from 'fs';

import { catchAsync } from '../utils/catchAsync.js';
import { createUserDataValidator } from '../utils/userValidators.js'
import { HttpError } from '../utils/httpError.js';

export const createUser = catchAsync(async (req, res) => {
  
  const { value, errors } = createUserDataValidator(req.body);

  if (errors) throw new HttpError(400, 'Invalid user data..', errors)

  const { name, year } = value;

  const newUser = {
    id: v4(),
    name,
    year
  };

  // TEMP save user to the DB
  const usersDB = await fs.readFile('data.json');

  const users = JSON.parse(usersDB);

  users.push(newUser);

  await fs.writeFile('data.json', JSON.stringify(users));

  // Send response
  res.status(201).json({
    msg: 'success',
    user: newUser,
  });
  
});

export const getUsersList = catchAsync(async (req, res) => {
  // TEMP save user to the DB
  const usersDB = await fs.readFile('data.json');
  const users = JSON.parse(usersDB);
  res.status(200).json({
    msg: 'success',
    users,
  });
});

export const getOneUser = (req, res) => {
  const { user } = req;
  res.status(200).json({
    msg: 'success',
    user,
  });
};
