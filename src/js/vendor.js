import '@babel/polyfill';
import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import _ from 'lodash';
import 'gsap';
import 'slick-carousel';
import './polyfill';
// import 'pace-progressbar';

svg4everybody();

window.$ = $;
window.jQuery = $;
window._ = _;

require('ninelines-ua-parser');
require('stackblur-canvas');
