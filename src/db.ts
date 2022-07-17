import { DataSource } from "typeorm";
import { Source } from "./data-source";
import { Data } from "./entity/Data";

const DB = (username: string) =>
{
   set: async (path: string, value: any) =>
   {
      return new Promise<boolean>(async (resolve, reject) =>
      {
         try
         {
            const src: DataSource = await Source(username).initialize();
            const data = new Data(path, value);

            await src.manager.delete(Data, { path: path });
            const result: Data = await src.manager.save(data);

            if (result.value)
            {
               resolve(true);
            }
         }
         catch (e: any)
         {
            console.log(new Date().toISOString());
            console.log(e);
            console.log(`set:\t${ value }`);
            console.log(`to:\t/${ username }/${ path }`);

            resolve(false);
         }
      });
   };

   get: async (path: string) =>
   {
      return new Promise<Data | undefined>(async (resolve, reject) =>
      {
         try
         {
            const src: DataSource = await Source(username).initialize();
            const result: Data = await src.manager.getId(Data, { path: path });

            if (result.value)
            {
               resolve(result);
            }
         }
         catch (e: any)
         {
            console.log(new Date().toISOString());
            console.log(e);
            console.log(`get:\t/${ username }/${ path }`);
         }

         resolve(undefined);
      });
   };
};

export default DB;