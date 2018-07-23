/**
 * /utils/promisify.js
 */
export default (func) => {
    return function(param = {}) {
        return new Promise((resolve, reject) => {
            param.success = function(res) {
                resolve(res);
            }
            param.fail = function(res) {
                reject(res);
            }
            func(param)
        });
    };
}