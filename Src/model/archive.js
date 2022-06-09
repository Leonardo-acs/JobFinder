
const {createModel} = require('mongoose-gridfs');

const archive = createModel({modelName: 'archive'});

module.exports = archive;
