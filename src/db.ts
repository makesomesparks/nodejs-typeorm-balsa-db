import { DataSource, DeleteResult } from "typeorm";
import { Source } from "./data-source";
import { Data } from "./entity/Data";

class DB
{
   username: string;

   constructor (username: string)
   {
      this.username = username;
   }

   async set(path: string, value: any)
   {
      const username = this.username;

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

   async get(path: string)
   {
      const username = this.username;

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
            console.log(`get:\t/${ this.username }/${ path }`);
         }

         resolve(undefined);
      });
   };

   async delete(path: string)
   {
      const username = this.username;

      return new Promise<boolean>(async (resolve, reject) =>
      {
         try
         {
            const src: DataSource = await Source(username).initialize();
            const result: DeleteResult = await src.manager.delete(Data, { path: path });

            if (result.affected > 0)
            {
               resolve(true);
            }
         }
         catch (e: any)
         {
            console.log(new Date().toISOString());
            console.log(e);
            console.log(`delete:\t/${ this.username }/${ path }`);
         }

         resolve(false);
      });
   };
}

export { DB as default };