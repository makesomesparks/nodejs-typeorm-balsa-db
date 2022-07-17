import express, { Request, Response, NextFunction } from 'express';
import ResponseSet from './entity/ResponseSet';
import Utils from './utils';

const app = express();
const router = express.Router();

var PORT = 3000;

app.all('/:usertoken/:path*', (req: Request, res: Response, next: NextFunction) =>
{
    const utils = Utils(req);

    const username = utils.getUsername();
    const token = utils.getToken();
    const ip = utils.getIPv4();

    let response: ResponseSet = new ResponseSet();

    if (Utils(req).getMethod() == "get")
    {

    }

    console.log(ip);
    console.log("req.user : " + req.params.usertoken);
    console.log("req.path : " + req.path);
    console.log("user : " + req.query.token);
    res.status(200).json(response);
});

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