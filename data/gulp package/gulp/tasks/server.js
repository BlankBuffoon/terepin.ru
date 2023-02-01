export const server = (done) => {
    app.plugins.browsersync.init({
        server: {
            baseDir: `${app.path.build.html}`
        },
        notify: false,
        host: app.host.localhost.host,
        port: app.host.localhost.port
    });
}