import request from 'supertest';
import app from '../app';
import HttpStatus from 'http-status-codes'
const agent = request.agent(app);

function serverReady(): Promise<void> {
    return new Promise<void>(resolve => {
        // @ts-ignore
        if (app.address) { resolve() }
        else {
            app.on('listening', () => resolve());
        }
    })
};


describe('Sign up test', () => {
    it('Should return user with profile_id', async () => {
        const newUserStub = {
            username: 'username',
            email: 'email@gmail.com',
            password: 'password123qwe',
            group: 'zalupa'
        };
        const res = await agent
           .post('/signup')
           .send(newUserStub);

        expect(res.status).toBe(HttpStatus.OK);
        expect(res.body).toHaveProperty('profile_id');
    });
});

describe('Sign in test', () => {
    it('Should login', async () => {
        const credentialInfo = {
            username: 'username',
            password: 'password123qwe'
        };
        const res = await agent
            .post('/login')
            .send(credentialInfo);

        expect(res.status).toBe(HttpStatus.OK);
        expect(res.body).toHaveProperty('username');
    });
});

beforeAll(async () => {
    await serverReady();
});

afterAll(() => {
   app.close();
});
