import { paramsToWhereEqualString } from '../db/utils';

describe('Test params to where equal string', () => {
    it('Should return valid where', () => {
        const params = {
            user_id: 1,
        };
        const [where, values] = paramsToWhereEqualString(params);
        expect(where.trim()).toEqual('WHERE user_id = $1');
        expect(values).toEqual([1]);
    });
    it('Should return empty string on empty params', () => {
        const [where, values] = paramsToWhereEqualString({});
        expect(where.trim()).toEqual('');
        expect(values).toEqual([]);
    })
});
