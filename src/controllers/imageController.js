var path = require('path');

// Get Image
const getImageByName = async (req, res) => { 
    let imageName = req.params.name  
    return res.sendFile(path.resolve('./upload/' + imageName))
};

module.exports = {
    getImageByName
};