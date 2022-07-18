import Cute from "cute-string-util/dist/cute";

const StringUtils =
{
   toBoolean: (value: any): boolean =>
   {
      const trueScheme = [ "true", "yes", "on", "1" ];

      value = Cute.valueOf(value);

      value = Cute.removeSpace(value);
      value = value.toLowerCase();

      if (trueScheme.includes(value))
      {
         return true;
      }

      return false;

   }

};

export { StringUtils as default };