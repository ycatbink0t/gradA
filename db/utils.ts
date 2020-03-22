interface Params {
    [key: string]: string | number | undefined,
}

type SqlAndValues = [string,  (string | number | undefined)[]];

function paramsToWhereEqualString(params: Params): SqlAndValues {
    let where = ' WHERE';
    const values: (string | number | undefined)[] = [];
    Object.keys(params).forEach((param, i) => {
        where += ` ${param} = $${i + 1} AND`;
        values.push(params[param])
    });
    if (values.length === 0) {
        where = '';
    }
    return [where.substr(0, where.length - 3), values];
}

function paramsToSetByIdString(params: Params): SqlAndValues {
    let set = ' SET';
    const values: (string | number | undefined)[] = [];
    let i = 1;
    Object.keys(params).forEach((param) => {
        if (param === 'id') {
            return;
        }
        set += ` ${param} = $${i}, `;
        values.push(params[param]);
    });
    set = set.substring(0, set.length - 2) + ` WHERE id = $${i + 1}`;
    values.push(params.id);
    return [set, values];
}

export { paramsToWhereEqualString, paramsToSetByIdString }
