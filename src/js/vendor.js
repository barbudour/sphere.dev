import '@babel/polyfill';
import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import _ from 'lodash';
import 'gsap';
import 'slick-carousel';
import './polyfill';
import * as StackBlur from 'stackblur-canvas';
// import 'pace-progressbar';

svg4everybody();

window.$ = $;
window.jQuery = $;
window._ = _;
window.StackBlur = StackBlur;

require('ninelines-ua-parser');
