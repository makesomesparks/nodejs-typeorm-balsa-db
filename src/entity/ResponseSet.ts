import { Data } from "./Data";

export default class ResponseSet
{
   result: boolean;
   message: string
   data: Data | Data[] | "";

   constructor (result: boolean = false, data: Data | Data[] | "" = "")
   {
      this.result = result;
      this.data = data;
   }
}