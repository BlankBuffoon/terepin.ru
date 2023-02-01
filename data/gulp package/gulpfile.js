// Импот модуля
import gulp from "gulp";
// Импорт путей
import { path } from "./gulp/config/path.js";
// Импорт плагинов
import { plugins } from "./gulp/config/plugins.js"
// Испорт данных LocalHost
import { host } from "./gulp/config/host.js";

// Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgsprite } from "./gulp/tasks/svgsprite.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    host: host,
    gulp: gulp,
    plugins: plugins
}

function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

// Постоянная выгрузка на FTP сервер при изменениях
// function watcher() {
//     gulp.watch(path.watch.files, gulp.series(copy, ftp));
//     gulp.watch(path.watch.html, gulp.series(html, ftp));
//     gulp.watch(path.watch.scss, gulp.series(scss, ftp));
//     gulp.watch(path.watch.js, gulp.series(js, ftp));
//     gulp.watch(path.watch.images, gulp.series(images, ftp));
// }

export { svgsprite }

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images, svgsprite));
const serverTasks = gulp.parallel(watcher, server);

const dev = gulp.series(reset, mainTasks, serverTasks);
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

export { dev }
export { build }
export { deployZIP }
export { deployFTP }

// Сценарий по умолчанию
gulp.task('default', dev);