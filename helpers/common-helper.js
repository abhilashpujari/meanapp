const _ = require('lodash');

module.exports = function() {
    return {
        getUsernameFromEmail :  function(email) {
            var username = email.substring(0, email.lastIndexOf("@"));
            return username.replace(/_/g, '-').toLowerCase();
        },
        ucFirst : function(word) {
            return _.upperFirst(word);
        }
    }
};