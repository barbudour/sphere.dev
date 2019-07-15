import '@babel/polyfill';
import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import 'gsap';

svg4everybody();

window.$ = $;
window.jQuery = $;

require('ninelines-ua-parser');
