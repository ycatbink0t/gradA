interface Params {
    [key: string]: string | number | undefined,
}

type SqlAndValues = [string,  (string | number | undefined)[]];

function paramsToWhereEqual(params: Params): SqlAndValues {
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

function paramsToSetById(params: Params): SqlAndValues {
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

function paramsToInsert(params: Params): SqlAndValues {
    let insert = '(';
    let insertTail = '(';
    const values: (string | number | undefined)[] = [];
    Object.keys(params).forEach((param, i) => {
        if (param === 'id') {
            return;
        }
        insert += param + ', ';
        insertTail += '$' + (i + 1)  + ', ';
        values.push(params[param]);
    });
    insertTail = insertTail.substr(0, insertTail.length - 2) + ')';
    insert = insert.substr(0, insert.length - 2) + ')';
    const sql = insert + ' VALUES ' + insertTail;
    return [sql, values];
}

export { paramsToWhereEqual, paramsToSetById, paramsToInsert }
