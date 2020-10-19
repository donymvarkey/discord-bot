function flattenError(errors){
    var fin = {};
    errors.array().forEach(element => {
        if(fin[element.param] === undefined)
            fin[element.param] = [element.msg]
        else
            fin[element.param].push(element.msg);
    });
    return fin;
}

module.exports = flattenError;
