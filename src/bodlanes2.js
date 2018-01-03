import {Slim} from 'slim-js'
import {tag, template} from 'slim-js/Decorators'

Slim.tag(
  'my-tag',
  `<div>Hello, I am a custom element too!</div>`,
  class MyTag extends Slim {
    // your code here
  }
);
