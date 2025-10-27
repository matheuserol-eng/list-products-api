import { makeProductService } from './product.service.js';
export const makeProductController = () => {
    const service = makeProductService();
    const create = async (request, response, next) => {
        try {
            const { name, price } = request.body;
            const product = await service.create({
                name, price, userId: request.user.id
            });
            return response.status(201).json(product);
        } catch (error) {
            return next(error);
        }
    };

    const list = async (request, response, next) => {
        try {
            const data = await service.list(request.query);

            return response.json(data);
        } catch (error) {
            return next(error);
        }
    };

    const get = async (request, response, next) => {
        try {
            return response.json(await service.get({ id: Number(request.params.id) }));
        }
        catch (error) {
            return next(error);
        }
    };

    const patch = async (request, response, next) => {
        try {
            return response.json(
                await service.patch({
                    id: Number(request.params.id),
                    data: request.body
                })
            );
        }
        catch (error) {
            return next(error);
        }
    };

    const remove = async (request, response, next) => {
        try {
            await service.remove({ id: Number(request.params.id) });
            
            return response.status(204).send();
        }
        catch (error) {
            return next(error);
        }
    };

    return { create, list, get, patch, remove };
};