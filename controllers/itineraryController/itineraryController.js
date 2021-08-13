const get = require("./services/getItineraries");
const getComments = require("./services/getComments");
const postComment = require("./services/postComment")
const checkUser = require('./services/checkUser');
const like = require('./services/like');
const editComment = require('./services/editComment');
const deleteComment = require('./services/deleteComment');

module.exports = {
    get,
    getComments,
    postComment,
    editComment,
    deleteComment,
    checkUser,
    like,
};