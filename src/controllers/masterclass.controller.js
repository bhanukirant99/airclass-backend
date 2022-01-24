const { Master } = require('../models');
const { Category } = require('../models');
const Comment = require('../models')
const mongoose = require('mongoose');
// const User = require('../models/user');
// const Razorpay = require('razorpay');
// const Transaction = require('../models/transactions');
// const path = require('path');
// const fs = require('fs');

//razorpay instance initialization
// var instance = new Razorpay({
//     key_id: process.env.RAZORPAY_ID,
//     key_secret: process.env.RAZORPAY_SECRET,
// });

exports.get_all_courses = async(req, res) => {
    var categories = await Category.find();
    Master.find((err, courses) => {
        let message;
        if (courses.length >= 0) {
            message = "Courses offered"
        } else {
            message = "Sorry! There are no courses in this category."
        }
        res.send({
            message: message,
            courses: courses,
            categories: categories
        });
    }).select('-description -aboutInstructor')
}

exports.get_courses_of_category = async(req, res) => {
    if (req.body.category != undefined) {
        query = { category: mongoose.Types.ObjectId(req.body.category) }
    } else {
        query = {};
    }
    console.log(req.body.category)
    var categories = await Category.find();
    Master.find(query, (err, courses) => {
        let message;
        if (courses.length >= 0) {
            message = "Courses offered"
        } else {
            message = "Sorry! There are no courses in this category."
        }
        res.render('courses', {
            isLogged: req.session.isLogged,
            adminLogged: req.session.adminLogged,
            message: message,
            courses: courses,
            categories: categories
        });
    }).select('-description -aboutInstructor')
}


exports.get_single_course = async(req, res) => {
    const courseID = mongoose.Types.ObjectId(req.params.courseID.toString());
    var mostLikedCourses = await Master.find()
        .limit(4)
        .select('-description')
        .sort({ likes: 'desc' });

    // var comments = await Comment.find({ courseID: courseID })
    //     .populate('userID')
    //     .sort({ timestamp: 'desc' });

    var user;
    if (req.user_id != null && req.token != null) {
        user = await User.findById(req.user_id);
        var purchasedCourse = user.purchasedCourse;
        var alreadyPurchased = false;
        for (let i = 0; i < purchasedCourse.length; i++) {
            if (purchasedCourse[i].toString() == req.params.courseID.toString()) {
                alreadyPurchased = true;
            }
        }
    }
}