import { Request } from "express";
import RequestScheme, { ResponseType, TypeType } from "../scheme/RequestScheme";
import Cute from "cute-string-util";
import { Data } from "../entity/Data";
import StringUtils from "./StringUtils";

export class Path
{
   path: path[];
   pathString: string;

   constructor ()
   {
      this.path.push({ name: "/" });
      this.pathString = "/";
   }
}

interface path
{
   name: string;
   passphrase?: string;
}

class RequestUtil
{
   request: Request;

   constructor (request: Request)
   {
      this.request = request;
   }

   private isRequestAlive(request: Request = this.request): boolean
   {
      if (typeof request === "undefined" || request === null)
      {
         return false;
      }

      return true;
   }

   getIPv4(request: Request = this.request): string
   {
      if (this.isRequestAlive(request))
      {
         let ip = request.socket.remoteAddress;

         if (ip.substring(0, 7) == "::ffff:")
         {
            ip = ip.substring(7);
         }

         return ip;
      }

      return "";
   }

   getParameter(request: Request | string = this.request, parameter?: string): string
   {
      let result: string = "";

      if (typeof request === "string")
      {
         parameter = request;
         request = this.request;
      }

      if (this.isRequestAlive(request))
      {
         if (request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH')
         {
            result = request.body[ parameter ];
         }
         else
         {
            result = request.params[ parameter ];
         }
      }

      return result;
   }

   getMethod(request: Request = this.request): "GET" | "SET" | "DELETE" | "UNKNOWN"
   {
      if (this.isRequestAlive(request))
      {
         if (request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH')
         {
            if (Cute.isEmpty(request.body[ RequestScheme.value ]))
            {
               return "GET";
            }
            else
            {
               return "SET";
            }
         }
         else if (request.method === 'GET')
         {
            return "GET";
         }
         else if (request.method === 'DELETE')
         {
            return "DELETE";
         }
      }

      return "UNKNOWN";
   }

   getUsername(request: Request = this.request): string | undefined
   {
      if (this.isRequestAlive(request))
      {
         const username = request.params.username.split(":");
         const result = username.length > 0 ? username[ 0 ] : "";

         return result;
      }

      return "";
   }

   getToken(request: Request = this.request): string | undefined
   {
      if (this.isRequestAlive(request))
      {
         const username = request.params.username.split(":");
         const result = username.length > 1 ? username[ 1 ] : "";

         return result;
      }

      return "";
   }

   getPath(request: Request = this.request): Path
   {
      let path: Path = new Path();

      if (this.isRequestAlive(request))
      {
         const p: string[] = request.params.path.split("/");

         if (p.length > 0)
         {
            for (let i = 1; i < p.length; i++)
            {
               p[ i ] = Cute.removeSpace(p[ i ]);

               if (!Cute.isBlank(p[ i ]))
               {
                  let explode = p[ i ].split(":");
                  let o = { name: explode[ 0 ], passphrase: undefined };

                  if (explode.length > 1)
                  {
                     o.passphrase = explode[ 1 ];
                  }

                  path.path.push(o);
                  path.pathString += `${ explode[ 0 ] }/`;
               }
            }

            if (path.pathString.endsWith("/"))
            {
               path.pathString = path.pathString.substring(0, path.pathString.length - 1);
            }
         }
      }

      return path;
   }

   getResponseType(request: Request = this.request): ResponseType
   {
      let result: ResponseType = "plain";

      if (this.isRequestAlive(request))
      {
         const responseType = this.getParameter(RequestScheme.type);

         if (!Cute.isEmpty(responseType))
         {
            result = (responseType as ResponseType);
         }
      }

      return result;
   }

   getData(request: Request = this.request): Data
   {
      let data: Data = new Data();

      if (this.isRequestAlive(request))
      {
         const isPublic = this.getParameter(RequestScheme.public);
         const passphrase = this.getParameter(RequestScheme.passphrase);
         const type: TypeType = this.getParameter(RequestScheme.type) as TypeType;
         const value = this.getParameter(RequestScheme.value);

         data.public = StringUtils.toBoolean(isPublic);
         data.passphrase = passphrase;
         data.type = type;
         data.value = value;
         data.date = new Date();

         data.path = this.getPath().pathString;
      }

      return data;
   }
};

export { RequestUtil as default };