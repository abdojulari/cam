// src/types/jquery.d.ts
import * as $ from 'jquery';

declare global {
    interface JQuery {
      selectpicker(method: string): void;
    }
  }
  
  export {};
  