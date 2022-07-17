import { Request } from "express";

const Utils = (r: Request | undefined = undefined) =>
{
   return {
      getIPv4: (req: Request = r): string =>
      {
         let ip = req.socket.remoteAddress;

         if (ip.substring(0, 7) == "::ffff:")
         {
            ip = ip.substring(7);
         }

         return ip;
      },

      getMethod: (req: Request = r): "get" | "set" | undefined =>
      {
         if (typeof req === "undefined")
         {
            return "get";
         }

         return undefined;
      },

      getUsername: (req: Request = r): string | undefined =>
      {
         if (typeof req === "undefined")
         {
            return undefined;
         }

         const usertoken = req.params.usertoken.split(":");
         const username = usertoken.length > 0 ? usertoken[ 0 ] : "";

         return username;
      },

      getToken: (req: Request = r): string | undefined =>
      {
         if (typeof req === "undefined")
         {
            return undefined;
         }

         const usertoken = req.params.usertoken.split(":");
         const token = usertoken.length > 1 ? usertoken[ 1 ] : "";

         return token;
      },

      getPath: (req: Request = r): string | undefined =>
      {
         if (typeof req === "undefined")
         {
            return undefined;
         }

         const path: string[] = req.params.path.split("/");

         if (path.length > 0)
         {
            return "/";
         }

         return "";
      }
   };
};

export default Utils;