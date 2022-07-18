import path from "path";
import fs from "fs";

const FileUtils =
{
   getRootPath: (): string =>
   {
      return process.cwd();
   },

   getFilePath: (filepath: string): string =>
   {
      return FileUtils.getRootPath() + "/" + filepath;
   }
};

export { FileUtils as default };