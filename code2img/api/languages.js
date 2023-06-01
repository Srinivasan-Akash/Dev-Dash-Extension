module.exports = (request, response) => {
    console.log('');
    console.log('🎉 ', request.url);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.json({
        "languages":  [
            'c', 
            'css', 
            'cpp', 
            'go', 
            'html', 
            'java', 
            'javascript',
            'jsx',
            'php',
            'python',
            'rust',
            'typescript'
        ]
    });
}