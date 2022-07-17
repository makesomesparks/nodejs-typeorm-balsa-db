import { Data } from "./Data";

export default class ResponseSet
{
   result: boolean;
   data: Data | Data[] | "";

   constructor (result?: boolean, data?: Data | Data[] | undefined)
   {
      this.result = false;

      if (result)
      {
         this.result = result;
      }


      if (data)
      {
         this.data = data;
      }
      else
      {
         this.data = "";
      }
   }
}