import YAML from 'yaml';
import fs from 'fs';
import FileUtils from './FileUtils';
import Cute from "cute-string-util";
import { AccessScheme, Tokens } from '../scheme/AccessScheme';

const PermissionUtils =
{
   getAccess: (): AccessScheme =>
   {
      return YAML.parse(fs.readFileSync(FileUtils.getFilePath("/conf/access.yml"), "utf8")) as AccessScheme;
   },

   getUsers: (): string[] =>
   {
      const access = PermissionUtils.getAccess();
      let result: string[] = [];

      if (typeof access.users !== "undefined")
      {
         access.users.forEach((user: string) =>
         {
            result.push(Cute.removeSpace(user));
         });
      }

      return result;
   },

   getToken: (username: string): Tokens[] =>
   {
      const access = PermissionUtils.getAccess();
      let result: Tokens[] = [];

      access.users[ username ].forEach((token: Tokens) =>
      {
         token.token = Cute.removeSpace(token.token);
         result.push(token);
      });

      return result;
   },

   getPassthroughIPv4: (username: string): string[] =>
   {
      const access = PermissionUtils.getAccess();
      let result: string[] = [];

      access.passthrough.ipv4[ username ].forEach((ip: string) =>
      {
         result.push(ip);
      });

      return result;
   },

};

export { PermissionUtils as default };
