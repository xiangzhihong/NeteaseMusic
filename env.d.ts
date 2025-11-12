/// <reference types="vite/client" />
import type { MessageApiInjection } from 'naive-ui/lib/message/src/MessageProvider';
/// <reference types="vite/client" />

export * from 'naive-ui/volar';
export { };


declare module 'vue' {
  export interface Window {
    $message: MessageApiInjection;
  }
}
// 任意键值对对象类型
export type AnyObject = {
  [key: string]: any;
};

// audio data
export type AudioIndexedData = {
  id: number;
  name: string;
  blob:Blob;
}
