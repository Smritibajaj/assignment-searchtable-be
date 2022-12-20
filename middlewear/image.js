const multer = require('multer');
const path = require("path");
// const imageStorage = multer.diskStorage({
//     // Destination to store image     
//     destination: 'uploads', 
//       filename: (req, file, cb) => {
//           cb(null, file.fieldname + '_' + Date.now() + '_'  
//              + path.extname(file.originalname))
//     }
// });


// const imageUpload = multer({
//     storage: imageStorage,
    
//     fileFilter(req, file, cb) {
//       if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) { 
//          // upload only png and jpg format
//          req.fileValidationError = 'Only image files are allowed!';
//          return cb(new Error('Only image files are allowed!'), false);
//        }
//      cb(undefined, true)
//   }
// }) 

// module.exports = imageUpload