import { paramsToInsert, paramsToWhereEqual } from '../db/utils';

describe('Test params to where equal string', () => {
    it('Should return valid where', () => {
        const params = {
            user_id: 1,
        };
        const [where, values] = paramsToWhereEqual(params);
        expect(where.trim()).toEqual('WHERE user_id = $1');
        expect(values).toEqual([1]);
    });
    it('Should return empty string on empty params', () => {
        const [where, values] = paramsToWhereEqual({});
        expect(where.trim()).toEqual('');
        expect(values).toEqual([]);
    })
});

describe('Test params to insert', () => {
    it('Should return valid insert', () => {
       const params = {
           user_id: 1,
       };
       const [insert, values] = paramsToInsert(params);
       expect(values).toEqual([1]);
       expect(insert.toLowerCase()).toEqual('(user_id) values ($1)')
    });
});
