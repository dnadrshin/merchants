import _ from 'lodash';

export default (resp, model, options) => {
    if(!resp)
        return [];

    return _.map(resp, data => model(data));
};