import express, { Request, Response, NextFunction } from 'express';
import YAML from "yaml";
import fs from "fs";
import DB from './db';
import ResponseSet from './entity/ResponseSet';
import RequestUtils, { Path } from './utils/RequestUtil';
import Cute from "cute-string-util";
import { Data } from './entity/Data';
import RequestScheme, { ResponseType } from './scheme/RequestScheme';
import FileUtils from './utils/FileUtils';
import PermissionUtils from './utils/PermissionUtils';

const app = express();
const router = express.Router();

var PORT = 3000;

const access = PermissionUtils.getAccess();

/* ----------------------- */

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.all('/:username/:path*', async (req: Request, res: Response, next: NextFunction) =>
{
    const ConfServer = YAML.parse(fs.readFileSync(FileUtils.getFilePath("/conf/server.yml"), "utf8"));

    const utils = new RequestUtils(req);

    const ip: string = utils.getIPv4();
    const username: string = utils.getUsername();
    const token: string = utils.getToken();
    const path: Path = utils.getPath();
    const responseType: ResponseType = utils.getResponseType();

    let response: ResponseSet = new ResponseSet();

    try
    {
        const db = new DB(utils.getUsername());

        if (Cute.isEmpty(username))
        {
            throw new Error("Username is required.");
        }

        if (Cute.isEmpty(ip))
        {
            throw new Error("Request expired.");
        }

        let data: Data = new Data();

        switch (utils.getMethod())
        {
            case "GET":
                data = await db.get(path.pathString);
                break;

            case "SET":
                await db.set(utils.getData());
                break;

            case "DELETE":
                await db.delete(path.pathString);
                break;

            default:
                throw new Error("Method not supported.");
        }
    }
    catch (err)
    {
        response.result = false;
        response.message = err.message;
    }

    switch (responseType)
    {
        case "json":
            res.status(200).json(response);
            break;

        case "yaml":
            res.status(200).write(YAML.stringify(response));
            break;

        default:
        case "plain":
            if (response.result)
            {
                if (Array.isArray(response.data))
                {
                    let result = "";

                    response.data.map((data: Data, index: number) =>
                    {
                        result += `${ index == 0 ? "" : "\n" }${ data.value }`;
                    });

                    res.status(200).send(result);
                }
                else if (response.data instanceof Data)
                {
                    res.status(200).send(response.data.value);
                }
                else
                {
                    res.status(200).send(response.data);
                }

            }
    }
});

/*     if (Cute.isEmpty(username))
{

}
else
{
    if (utils.getMethod() == "GET")
    {
        const db = new DB(utils.getUsername());
    }
    else
    {

    }

    console.log(ip);
    console.log("req.user : " + req.params.usertoken);
    console.log("req.path : " + req.path);
    console.log("user : " + req.query.token);
}



}); */

app.use(router);
app.listen(PORT, () => { });

/* AppDataSource.initialize().then(async () =>
{
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await AppDataSource.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express / fastify / any other framework.");

}).catch(error => console.log(error));
 */