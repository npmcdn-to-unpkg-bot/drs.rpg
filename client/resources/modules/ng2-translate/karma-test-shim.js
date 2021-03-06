// Turn on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100;

// Cancel Karma's synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function() {
};

System.config({
    baseURL: '/base/',
    defaultJSExtensions: true,
    map: {
        '@angular': 'node_modules/@angular',
        'rxjs': 'node_modules/rxjs'
    },
    packages: {
        '@angular/common': {main: 'index.js', defaultExtension: 'js'},
        '@angular/compiler': {main: 'index.js', defaultExtension: 'js'},
        '@angular/core': {main: 'index.js', defaultExtension: 'js'},
        '@angular/http': {main: 'index.js', defaultExtension: 'js'},
        '@angular/platform-browser': {main: 'index.js', defaultExtension: 'js'}
    }
});

// Set up the test injector, then import all the specs, execute their `main()`
// method and kick off Karma (Jasmine).
System.import('@angular/core/testing')
    .then(function(coreTesting){
        return System.import('@angular/platform-browser-dynamic/testing')
            .then(function(browserTesting) {
                coreTesting.TestBed.initTestEnvironment(
                    browserTesting.BrowserDynamicTestingModule,
                    browserTesting.platformBrowserDynamicTesting());
            });
    })
    .then(function() {
        return Promise.all(
            Object.keys(window.__karma__.files) // All files served by Karma.
                .filter(onlySpecFiles)
                .map(window.file2moduleName)        // Normalize paths to module names.
                .map(function(path) {
                    return System.import(path).then(function(module) {
                        if (module.hasOwnProperty('main')) {
                            module.main();
                        } else {
                            throw new Error('Module ' + path + ' does not implement main() method.');
                        }
                    });
                }));
    })
    .then(function() {
        __karma__.start();
    }, function(error) {
        __karma__.error(error.stack || error);
    });

function onlySpecFiles(path) {
    return /[\.|_]spec\.js$/.test(path);
}

// Normalize paths to module names.
function file2moduleName(filePath) {
    return filePath.replace(/\\/g, '/')
        .replace(/^\/base\//, '')
        .replace(/\.js/, '');
}