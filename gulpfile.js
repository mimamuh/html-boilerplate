/**
* @Author: Matthias Gohla <Matze>
* @Date:   2017-01-11T12:17:51+01:00
* @Email:  matze_lebt@gmx.de
* @Last modified by:   Matze
* @Last modified time: 2017-01-19T14:48:11+01:00
*/
'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
var tap = require('gulp-tap')
var path = require('path');
var array = require('lodash/array');


/**
 * This function replaces a certain file extension with another extension
 * @param  string   sourceFile  whole direcotry path
 * @return string   processed directory path
 */
function switchFileExtensions(sourceFile, newExtension) {
    const parsedPath = path.parse(sourceFile);
    return `${parsedPath.dir}/${parsedPath.name}${newExtension}`;
}

const checkForMissingStoryFiles = () => (
    new Promise((resolve, reject) => {
        const relativePathsToHtmlFiles = [
            'src/**/*.html',
        ];
        const relativePathsToStoryFiles = [
            'src/**/stories/*.js'
        ];
        let htmlFilesArr = [];
        let storyFilesArr = [];
        Promise.all([
            getFileArray(relativePathsToHtmlFiles).then((result) => {
                htmlFilesArr = result;
            }),
            getFileArray(relativePathsToStoryFiles).then((result) => {
                storyFilesArr = result;
            }),
        ])
            .then(() => {
                resolve(
                    array.differenceBy(htmlFilesArr, storyFilesArr, 'name')
                         .map((file) => (
                             `${file.dir}/${file.base}`
                         )
                    )
                );
            })
            .catch((error) => (
                console.log(error)
            ));
    })
)

const getFileArray = (sourcePath) => (
    new Promise((resolve, reject) => {
        const files = [];
        gulp.src(sourcePath)
        .pipe(tap((file) => {
            files.push(path.parse(file.path));
        }))
        .on('end', () => {
            resolve(files);
        });
    })
)


const createStoryFiles = (files) => (
    new Promise((resolve, reject) => {
        const pathToBaseStory = './.storybook/BaseStory.js';
        gulp.src(files)
        .pipe(tap((file) =>{
            const parsedPath = path.parse(file.path);
            const storyDestinationPath = `${parsedPath.dir}/stories/`;
            gulp.src(pathToBaseStory)
            .pipe(rename((filePath) => {
                filePath.dirname = '';
                filePath.basename = parsedPath.name;
            }))
            .pipe(gulp.dest(storyDestinationPath))
            .on('end', function () {
                injectImportStatements(
                    storyDestinationPath,
                    parsedPath.name,
                    '.js',
                    `./../${parsedPath.base}`
                )
            });
        }))
        .on('end', () => {
            resolve()
        });
    })
);

/**
 * injects html import statements inside a story file
 * @param  {[type]} targetPath          directory of the story file
 * @param  {[type]} targetFile
 * @param  {[type]} targetFileExtension [description]
 * @param  {[type]} source              [description]
 * @return {[type]}                     [description]
 */
const injectImportStatements = (targetPath, targetFile, targetFileExtension, source) => (
    new Promise((resolve, reject) => {
        const cwd = targetPath;
        const target = `${cwd}${targetFile}${targetFileExtension}`;
        const options = {
            read: false,
            cwd: cwd,
        };
        gulp.src(target)
        .pipe(inject(
            gulp.src(source, options),
            {
                starttag: '/* inject:imports */',
                endtag: '/* endinject */',
                transform: function (filepath) {
                    return 'import htmlTemplate from \'.' + filepath + '\';';
                }
            }
        ))
        .pipe(inject(
            gulp.src(source, options),
            {
                starttag: '/* inject:filename */',
                endtag: '/* endinject */',
                transform: function (filepath) {
                    return '\'' + targetFile + '\'';
                }
            }
        ))
        .pipe(gulp.dest(cwd));
    })
)


const injectSassImportStatements = (srcPath, file) => (
    new Promise((resolve, reject) => {
        const cwd = './src';  // currentWorkingDirectory
        const target = `${srcPath}/${file}`;
        const source = [`${cwd}/**/styles/*.scss`, '!'+target];
        const options = { read: false };
        gulp.src(target)
        .pipe(
            inject(
                gulp.src(
                        source,
                        options
                ), {
                    relative: true,
                    starttag: '/* inject:imports */',
                    endtag: '/* endinject */',
                    transform: function (filepath) {
                        filepath = switchFileExtensions(filepath, '');
                        console.log(filepath);
                        return '@import \'./' + filepath + '\';';
                    }
                }
            )
        )
        .pipe(gulp.dest(srcPath))
        .on('end', () => {
            resolve();
            console.log("finished injecting files into main.scss");
        });
    })
)


const injectSass = () => {
    injectSassImportStatements('src/assets/scss', 'main.scss')
    .catch((error) => {
         console.log(error);
    });
}


const createStories = () => {
    checkForMissingStoryFiles().then((result) => {
        createStoryFiles(result).
        catch((error) => {
            console.log(error);
        });
    }).catch((error) => {
        console.log(error);
    });
}

/**
 * creates story files for all html files inside /src
 */
gulp.task('create-stories', createStories);

/**
 * once-only build
 */
gulp.task('inject-scss', injectSass);
