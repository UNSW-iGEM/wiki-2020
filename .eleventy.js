module.exports = function(eleventyConfig) {
    eleventyConfig.addFilter("sortByName", function(values) {
        let vals = [...values];     // this *seems* to prevent collection mutation...
        return vals.sort((a, b) => a.data.name.localeCompare(b.data.name));
    });
    return {
        templateFormats: [
            "html",
            "md",
            "css",
            "jpg"
        ],
        passthroughFileCopy: true
    };
}
