import { Router } from 'express';
import { check, query, body, param, cookie } from 'express-validator';
import { IController } from '../controllers/IController';
import { IModel, Model, modelBuilder } from './ModelBuilder';
import controllerBuilder from './controllerBuilder';
import pool from '../db';

type expressValidator = typeof cookie | typeof check | typeof query | typeof body | typeof param;

export interface IValidators {
    all?: expressValidator[],
    get?: expressValidator[],
    getById?: expressValidator[],
    put?: expressValidator[],
    patch?: expressValidator[],
    delete?: expressValidator[],
    post?: expressValidator[],
}

function routerForController<T>(path: string, controller: IController<T>, validators?: IValidators): ReturnType<Router> {
    const router = Router();

    if (validators) {
        const all = validators.all ? validators.all : [];
        router.get(path + '/', validators.get ?
            [...validators.get, ...all] :
            all, controller.get);
        router.get(path + '/:id', validators.getById ?
            [...validators.getById, ...all] :
            all, controller.getById);
        router.put(path + '/', validators.put ?
            [...validators.put, ...all] :
            all, controller.put);
        router.patch(path + '/', validators.patch ?
            [...validators.patch, ...all] :
            all, controller.patch);
        router.delete(path + '/', validators.delete ?
            [...validators.delete, ...all] :
            all, controller.delete);
        if (controller.post) {
            router.post(path + '/', validators.post ?
                [...validators.post, ...all] :
                all, controller.post);
        }
    } else {
        router.get(path + '/', controller.get);
        router.get(path + '/:id', controller.getById);
        router.put(path + '/', controller.put);
        router.patch(path + '/', controller.patch);
        router.delete(path + '/', controller.delete);
        if (controller.post) {
            router.post(path + '/', controller.post);
        }
    }
    return router;
}

function routerForModel<T>(path: string, model: Model<T>, validators?: IValidators): ReturnType<Router> {
    const controller: IController<T> = controllerBuilder<T>(model);
    return routerForController<T>(path, controller, validators);
}

function routerForTable<T extends IModel>(path: string, tableName: string, validators?: IValidators): ReturnType<Router> {
    const model = modelBuilder<T, typeof pool>(pool, tableName);
    return routerForModel(path, model, validators);
}

export default { routerForController, routerForModel, routerForTable };
