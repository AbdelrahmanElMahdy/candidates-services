import { expect } from 'chai';
import request from 'supertest';
import app from '../index';
var CURRENT_TOKEN: string=''

describe('CANDIDATE', () => {
    it('unauthorized request', async () => {
        try {
            let response: any = await request(app.express).get(
                '/v1/candidates/'
            );
            expect(response.status).to.equal(401);
            expect(response.body.message).to.equal('Unauthorized');
        } catch (error) {
            throw error;
        }
    });
    it('create Candidate request', async () => {
        try {
            let response: any = await await request(app.express)
                .post('/v1/candidates/')
                .send({
                    first_name: 'abdo',
                    last_name: 'mahdy',
                    email: 'example@example.com',
                    job_title: 'software engineer',
                    phone: '03204045',
                    avatar: 'http://example.com',
                });
                
            CURRENT_TOKEN = response.body.token
            expect(response.status).to.equal(201);
            expect(response.body).to.haveOwnProperty("token");
        } catch (error) {
            throw error;
        }
    });
    it('get candidate ', async () => {
        try {
            let response: any = await request(app.express).get(
                '/v1/candidates/'
            ).set({authorization:`Bearer ${CURRENT_TOKEN}`});

            expect(response.status).to.equal(200);
        } catch (error) {
            throw error;
        }
    });
    it('get candidate without authentication', async () => {
        try {
            let response: any = await request(app.express).get(
                '/v1/candidates/'
            )

            expect(response.status).to.equal(401);
            expect(response.body.message).to.equal('Unauthorized');
        } catch (error) {
            throw error;
        }
    });
});
