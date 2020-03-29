import { Request, Response } from 'express';

export interface IController<T> {
    get(req: Request, res: Response<T[]>): Promise<void>;
    getById(req: Request, res: Response<T>): Promise<void>;
    put(req: Request, res: Response<T>): Promise<void>;
    patch(req: Request, res: Response<T>): Promise<void>;
    delete(req: Request, res: Response<void>): Promise<void>;
    post?: (req: Request, res: Response<T>) => Promise<void>;
}
