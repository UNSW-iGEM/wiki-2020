const sass = require('./config/sass-process');

module.exports = function(eleventyConfig) {
    sass('./src/_includes/scss/main.scss', './_site/css/main.css');
    eleventyConfig.addFilter("sortByName", function(values) {
        let vals = [...values];     // this *seems* to prevent collection mutation...
        return vals.sort((a, b) => a.data.name.localeCompare(b.data.name));
    });
    return {
        templateFormats: [
            "html",
            "md",
            "css",
            "jpg",
            "png",
            "svg",
        ],
        passthroughFileCopy: true
    };
}
