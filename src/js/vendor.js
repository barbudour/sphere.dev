import '@babel/polyfill';
import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import 'gsap';
import 'slick-carousel';
import barba from '@barba/core';
import barbaRouter from '@barba/router';
import barbaCss from '@barba/css';
import './polyfill';
import * as StackBlur from 'stackblur-canvas';

svg4everybody();

window.$ = $;
window.jQuery = $;
window.StackBlur = StackBlur;
window.barba = barba;
window.barbaRouter = barbaRouter;
window.barbaCss = barbaCss;

require('ninelines-ua-parser');
