import { Router } from 'express';
import { createUser, getOneUser, getUsersList } from '../controllers/userControllers.js'
import { checkUserId } from '../middlewares/userMiddlewares.js';

const router = Router();

/**
 * REST api (Create, Read, Update, Delete) ================
 * POST, GET, PATCH (PUT), DELETE
 * POST             /users
 * GET              /users
 * GET              /users/<userid>
 * PATCH            /users/<userid>
 * DELETE           /users/<userid>
 */

// router.post('/', createUser);
// router.get('/', getUsersList);
// router.get('/:id', checkUserId, getOneUser);
// router.patch('/:id', checkUserId, getOneUser);
// router.delete('/:id', checkUserId, getOneUser);

router
  .route('/')
  .post(createUser)
  .get(getUsersList);

router.use('/:id', checkUserId);
router
  .route('/:id')
  .get(getOneUser)
  .patch(getOneUser)
  .delete(getOneUser);


export { router };