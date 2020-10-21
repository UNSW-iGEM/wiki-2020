const yaml = require("js-yaml");

module.exports = function(eleventyConfig) {
    eleventyConfig.addDataExtension("yml", contents => yaml.safeLoad(contents));
    eleventyConfig.addPassthroughCopy("build");
    eleventyConfig.addPassthroughCopy({"dist/build/font/*": "assets/fonts"});
    eleventyConfig.addFilter("sortByName", function(values) {
        let vals = [...values];     // this *seems* to prevent collection mutation...
        return vals.sort((a, b) => a.data.name.localeCompare(b.data.name));
    });
    eleventyConfig.addFilter("getFileType", function(values) {
        return values.split('.').pop();
    })
    eleventyConfig.addFilter("imagePrefix", function(values) {
        return "/assets/images/" + values;
    })
    eleventyConfig.addFilter("cite", function(values) {
        // grab the paper name and stuff from the csv.
        return "(Li, Robbers 2030)";
    });
    return {
        templateFormats: [
            "html",
            "md",
            "jpg",
            "png",
            "svg",
        ],
        passthroughFileCopy: true,
        dir: {
            input: "site",
            output: "dist"
          }
    };
}
