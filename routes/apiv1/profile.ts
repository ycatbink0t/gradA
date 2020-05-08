import { profileController } from '../../controllers/profile';
import { routerForController } from '../../utils/routerBuilder';
import { IProfile } from '../../models/Profile';
import { query } from 'express-validator';

const profileRouter = routerForController<IProfile>('', profileController, {
    get: [query('name').optional(),
        query('surname').optional(),
        query('city').optional(),
        query('country').optional(),
        query('user_id').optional().isNumeric(),
        query('info').optional()
    ]
});

export { profileRouter };
