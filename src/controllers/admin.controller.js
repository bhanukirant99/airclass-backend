const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {Admin} = require('../models');
const {Content} = require('../models');
const {Course} = require('../models');
const { authService, userService, tokenService, emailService } = require('../services');

exports.get_newCourse_page = (req, res) => {
    Content.find((err, categories) => {
        if (err) {
            return res.render('newCourse', {
                isLogged: req.session.isLogged,
                adminLogged: req.session.adminLogged,
                message: "Some problem occured with database. Please reload the page",
                categories: []
            });
        }
        return res.render('newCourse', {
            isLogged: req.session.isLogged,
            adminLogged: req.session.adminLogged,
            message: "Enter details to create a new course",
            categories: categories
        });
    })

}
exports.create_newCourse = (req, res) => {
    const newCourse = new Course({
        courseTitle: req.body.courseTitle,
        courseInfo: req.body.courseInfo,
        // description: req.body.description,
        courseImage: req.body.courseImage,
        // aboutInstructor: req.body.aboutInstructor,
        // price: req.body.price,
        // watchHours: req.body.watchHours,
    })
    newCourse.save((err, course) => {
        if (err) console.log(err)
        res.status(httpStatus.CREATED).send(newCourse);
    })
}


exports.get_addContent_page = (req, res) => {
    return res.render('addNewContent', {
        isLogged: req.session.isLogged,
        adminLogged: req.session.adminLogged,
        message: "Enter the name of new Content."
    });
}
exports.create_newContent = (req, res) => {
    // newContent = new Content({
    //     name: req.body.Content
    // })
    // newContent.save((err, Content) => {
    //     if (err) {
    //         return res.send({
    //             message: "Some error occurred while creating the Content. Make sure this Content doesn't already exists."
    //         });
    //     } else {
    //         res.redirect('/admin/newCourse')
    //     }
    // })
    const newCourse = new Course({
        courseTitle: req.body.courseTitle,
        courseInfo: req.body.courseInfo,
        // description: req.body.description,
        courseImage: req.body.courseImage,
        // aboutInstructor: req.body.aboutInstructor,
        // price: req.body.price,
        // watchHours: req.body.watchHours,
    })
    newCourse.save((err, course) => {
        if (err) console.log(err)
        res.status(httpStatus.CREATED).send(newCourse);
    })
}

exports.get_uploadVideo_page = (req, res) => {
    const courseID = req.params.courseID;
    Course.findById(courseID, (err, course) => {
        if (err) {
            return res.render('uploadVideo', {
                isLogged: req.session.isLogged,
                adminLogged: req.session.adminLogged,
                message: "Some error occurred while creating the course. Retry again.",
                course: null
            });
        }
        return res.render('uploadVideo', {
            isLogged: req.session.isLogged,
            adminLogged: req.session.adminLogged,
            message: "Upload the folder of videos containing the lectures. Naming should be done as 1.mp3, 2.mp4 etc",
            course: course
        });
    })
}

exports.create_uploadVideo = (req, res) => {
    const courseID = req.params.courseID;
    Course.findById(courseID, (err, course) => {
        if (err) {
            return res.render('uploadVideo', {
                isLogged: req.session.isLogged,
                adminLogged: req.session.adminLogged,
                message: "Some error occurred while creating the course. Can't fint the course",
                course: null
            });
        }
        course.videoUrl = req.videoFolder;
        course.save();
        res.redirect('/courses')
    })
}

exports.admin_register = async(req, res) => {
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
    // if (req.body.email == process.env.ADMIN_USER && req.body.password == process.env.ADMIN_PASS) {
    //     req.session.adminLogged = true
    //     res.redirect('/admin/newCourse');
    // } else {
    //     return res.render('adminLogin', {
    //         isLogged: req.session.isLogged,
    //         adminLogged: req.session.adminLogged,
    //         message: "User Name or password entered is incorrect."
    //     })
    // }
}

exports.admin_login = async(req, res) => {
    // const { email, password } = req.body;
    // const admin = await authService.loginUserWithEmailAndPassword(email, password);
    // const tokens = await tokenService.generateAuthTokens(user);
    // res.redirect('/admin/newCourse');
    // res.send({ user, tokens });
    if (req.body.email == process.env.ADMIN_USER && req.body.password == process.env.ADMIN_PASS) {
        res.redirect('/admin/homepage');
    } else {
        return res.send('adminLogin', {
            message: "User Name or password entered is incorrect."
        })
    }
}

exports.admin_logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) console.log(err);
        console.log('logged out');
        res.redirect('/');
    })
}