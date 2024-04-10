module.exports = function (grunt) {
  grunt.initConfig({
    watch: {
      html: {
        files: "src/index.html",
        tasks: ["html"],
      },
      css: {
        files: ["src/styles/**/*.scss", "src/styles/blocks/*.scss"],
        tasks: ["css"],
      },
      js: {
        files: ["src/scripts/*.js"],
        tasks: ["js"],
      },
    },
    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
        },
        files: {
          "dist/index.html": "src/index.html",
        },
      },
    },
    sass: {
      dev: {
        files: {
          "dist/main.css": "src/styles/main.scss",
        },
      },
    },
    cssmin: {
      build: {
        src: "dist/main.css",
        dest: "dist/main.min.css",
      },
    },
    concat: {
      options: {
        separator: "\n/*next file*/\n\n",
      },
      dist: {
        src: ["src/scripts/*.js"],
        dest: "dist/bundle.js",
      },
    },
    uglify: {
      build: {
        files: {
          "dist/bundle.min.js": ["dist/bundle.js"],
        },
      },
    },
    clean: {
      css: ["dist/main.css"],
      js: ["dist/bundle.js"],
    },
    imagemin: {
      jpg: {
        options: {
          optimizationLevel: 3,
        },
        files: [
          {
            expand: true,
            cwd: "src/images/",
            src: ["**/*.jpg"],
            dest: "dist/images/",
          },
        ],
      },
    },
    svgmin: {
      options: {
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                sortAttrs: false,
              },
            },
          },
        ],
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: "src/images/",
            src: ["**/*.svg"],
            dest: "dist/images/",
            ext: ".svg",
          },
        ],
      },
    },
    copy: {
      favicon: {
        src: "src/images/favicon.ico",
        dest: "dist/images/favicon.ico",
      },
      fonts: {
        src: "src/fonts/**/*.woff2",
        dest: "dist/",
      },
    },
  });

  // Default Tasks
  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("html", ["htmlmin"]);
  grunt.registerTask("css", ["sass", "cssmin", "clean:css"]);
  grunt.registerTask("js", ["concat", "uglify", "clean:js"]);
  grunt.registerTask("images", ["imagemin", "svgmin", "copy:favicon"]);
  grunt.registerTask("fonts", ["copy:fonts"]);

  // Load Up Tasks
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-svgmin");
  grunt.loadNpmTasks("grunt-contrib-copy");
};