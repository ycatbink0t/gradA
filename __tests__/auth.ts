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
            group: 'teacher',
        };
        const res = await agent
           .post('/signup')
           .send(newUserStub);

        expect(res.status).toBe(HttpStatus.CREATED);
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
        2
        expect(res.status).toBe(HttpStatus.OK);
        expect(res.body).toHaveProperty('username');
    });
});

describe('Profile test', () => {
    it ('Should get user profile', async () => {
        const res = await agent.get('/api/v1/profile?me=true');
        expect(res.status).toBe(HttpStatus.OK);
        expect(res.body).toHaveProperty('user_id');
    });
});

beforeAll(async () => {
    await serverReady();
});

afterAll(() => {
   app.close();
});
