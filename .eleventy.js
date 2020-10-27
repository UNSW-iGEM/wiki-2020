const yaml = require("js-yaml");

module.exports = function(eleventyConfig) {
    eleventyConfig.addDataExtension("yml", contents => yaml.safeLoad(contents));
    eleventyConfig.addPassthroughCopy({"build/*": "assets"});
    // eleventyConfig.addPassthroughCopy({"dist/build/font/*": "assets/fonts"});
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
    eleventyConfig.addFilter("betweenBody", function(values) {
        // janky way to just get the content between body tags
        return values.split('<body>')[1].split('</body>')[0];
    });

    eleventyConfig.addFilter("sideBySide", function(values) {
        buffer = '<div class="side-by-side">';
        for (part of values.split('SPLIT')) {
            caption = '';
            if (part.includes("#")) {
                [link, caption] = part.split('#');
            } else {
                link = part;
            }
            buffer += '<figure>'
            buffer += `<img src="${link}">`
            if (caption) {
                buffer += `<figcaption>${caption}</figcaption>`
            }
            buffer += '</figure>'
        }
        buffer += '</div>';
        return buffer;
    })

    eleventyConfig.addPassthroughCopy('site/assets')
    return {
        dir: {
            input: "site",
            output: "dist"
          }
    };
}
