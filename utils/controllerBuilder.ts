import { Model } from './ModelBuilder';
import { IController } from '../controllers/IController';
import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

function controllerBuilder<T>(model: Model<T>): IController<T> {
    return {
        async get(req: Request, res: Response<T[]>): Promise<void> {
            const objects = await model.get(req.query);
            if (objects) {
                res.send(objects);
            } else {
                res.status(HttpStatus.NO_CONTENT).send();
            }
        },

        async getById(req: Request, res: Response<T>) {
            const objects = await model.get(req.query);
            if (objects?.length) {
                res.send(objects[0]);
            } else {
                res.status(HttpStatus.NO_CONTENT).send();
            }
        },

        async put(req: Request, res: Response<T>) {
            const object = await model.put(req.body as T);
            res.status(HttpStatus.CREATED).send(object);
        },

        async patch(req: Request, res: Response<T | { error: string }>) {
            if (req.body as T && req.body.id) {
                const object = await model.patch({id: req.params.id, ...req.body});
                res.status(HttpStatus.CREATED).send(object);
            } else {
                res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({error: 'Missing param id'});
            }
        },

        async delete(req: Request, res: Response<void>) {
            if (req.params.id) {
                await model.delete(+req.params.id);
                res.status(HttpStatus.OK).send();
            }
        }
    };
}

export default controllerBuilder;
