const sass = require("node-sass");

const PORT = 9000;

module.exports = function (grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    connect: {
      server: {
        options: {
          livereload: true,
          port: PORT,
          base: "src",
        },
      },
    },
    sass: {
      options: {
        implementation: sass,
        sourceMap: true,
      },
      dev: {
        files: {
          "src/css/style.css": "src/scss/style.scss",
          "src/css/reset.css": "src/scss/reset.scss",
        },
      },
      dist: {
        files: {
          "dist/src/css/style.css": "src/scss/style.scss",
          "dist/src/css/reset.css": "src/scss/reset.scss",
        },
      },
    },
    uglify: {
      dist: {
        files: {
          "dist/src/js/main.js": ["src/js/**/*.js"],
        },
      },
    },
    includereplace: {
      your_target: {
        src: "src/*.html",
        dest: "dist/",
        options: {
          includesDir: "./src/include/",
        },
      },
    },
    copy: {
      assets: {
        files: [{ expand: true, cwd: "src/assets/", src: "**/*", dest: "dist/src/assets" }],
      },
    },
    watch: {
      options: {
        livereload: true,
      },
      livereload: {
        options: { livereload: true },
        files: ["dist/**/*"],
      },
      server: {
        options: {
          livereload: true,
        },
        files: ["dist/**/*"],
      },
      sass: {
        files: ["src/scss/**/*.scss"],
        tasks: ["sass:dev", "sass:dist"],
        options: {
          livereload: true,
        },
      },
      html: {
        files: ["src/**/*.html", "src/include/**/*.html"],
        tasks: ["includereplace"],
      },
      js: {
        files: ["src/js/**/*.js"],
        tasks: ["uglify"],
      },
      asset: {
        files: ["src/assets/**/*"],
        tasks: ["copy:assets"],
        options: {
          livereload: false,
        },
      },
    },
  });

  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-include-replace");
  grunt.loadNpmTasks("grunt-contrib-copy");

  grunt.registerTask("default", ["sass:dev", "uglify", "includereplace", "copy", "connect:server", "watch", "watch:server"]);
  grunt.registerTask("build", ["sass:dist", "uglify", "includereplace", "copy"]);
};
