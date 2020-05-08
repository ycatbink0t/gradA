import { Router } from 'express';
import { ValidationChain } from 'express-validator';
import { IController } from '../controllers/IController';
import { IModel, Model, modelBuilder } from './ModelBuilder';
import controllerBuilder from './controllerBuilder';
import pool from '../db';

export interface IValidators {
    all?: ValidationChain[],
    get?: ValidationChain[],
    getById?: ValidationChain[],
    put?: ValidationChain[],
    patch?: ValidationChain[],
    delete?: ValidationChain[],
    post?: ValidationChain[],
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

export { routerForController, routerForModel, routerForTable };
