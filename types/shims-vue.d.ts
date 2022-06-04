declare module "*.vue" {
  import Vue from "vue"
  export default Vue
}

// declare global {
//   interface Window {
//     $message: any
//   }
// }

declare interface Window {
  $message: any
}
