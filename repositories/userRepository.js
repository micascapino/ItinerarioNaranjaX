const User = require ("../database/models/userModel");

const getAll = async() => await User.find();
const count = async() => await User.count();
const getUserByMail = async(mail) => await User.findOne({"mail":mail});

module.exports = { getAll, count, getUserByMail };
