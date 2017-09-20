var elixir = require('laravel-elixir');
var theme = 'tanager';
elixir.config.assetsPath = './';
elixir.config.publicPath = './';

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Statamic theme. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass(theme + '.scss', 'css/' + theme + '.css')
       .sass('schemes_out/blue.scss', 'css/schemes/blue.css')
       .sass('schemes_out/dark.scss', 'css/schemes/dark.css')
       .sass('schemes_out/green.scss', 'css/schemes/green.css')
       .sass('schemes_out/orange.scss', 'css/schemes/orange.css')
       .sass('schemes_out/purple.scss', 'css/schemes/purple.css')
       .sass('schemes_out/red.scss', 'css/schemes/red.css');

    mix.scripts([
        'vendor/zoom.js',
        'vendor/hljs.js',
        'meerkat.js',
        'header.js',
        'maps.js',
        'theme.js'
    ], './js/tanager.js');
});