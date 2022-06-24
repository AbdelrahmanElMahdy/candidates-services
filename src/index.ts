import "dotenv/config";
import CandidateController from "./resources/candidate.controller";
import App from './app';

const app = new App(
    [new CandidateController()],
    Number(process.env.PORT)
);

app.listen();