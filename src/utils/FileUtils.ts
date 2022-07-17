import path from "path";

const FileUtils = () =>
{
   getRootPath: (): string =>
   {
      return path.resolve(__dirname);
   };
};

module.exports = FileUtils;