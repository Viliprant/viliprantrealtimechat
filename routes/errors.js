// 404 error
function error404(req, res, next) {
    res.status(404);
    res.json({
        'status' : res.statusCode,
        'message' : 'Cette page n\'existe pas',
    })
}

module.exports = {
    error404,
}