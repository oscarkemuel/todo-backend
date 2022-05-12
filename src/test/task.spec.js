import request from 'supertest';
import app from '../app.js'
import test from 'jest';

beforeAll(() => {
    process.env.NODE_ENV = 'test';
})

afterAll(() => {
    process.env.NODE_ENV = 'prod';
})

describe('Task tests', () => {
    it('it should list tasks', async () => {
        const payload = {
            name: "Tarefa 1",
            description: "Descricao tarefa 1",
            tag: "Tag"
        }
        await request(app).post('/tasks').send(payload);

        const res = await request(app).get('/tasks');

        expect(res.status).toBe(200);
        expect(res.body).not.toBeNull();
        expect(res.body.length).toBe(1);
    })

    it('it should create an task', async () => {
        const payload = {
            name: "Tarefa 1",
            description: "Descricao tarefa 1",
            tag: "Tag"
        }

        const res = await request(app).post('/tasks').send(payload);

        expect(res.status).toBe(201);
        expect(res.body).not.toBeNull();
        expect(res.body.name).toEqual(payload.name)
        expect(res.body.description).toEqual(payload.description)
        expect(res.body.tag).toEqual(payload.tag)
    })

    it('it should return 400 when required name is not provided', async () => {
        const payload = {
            description: "Descricao tarefa 1",
            tag: "Tag"
        }
        
        const res = await request(app).post('/tasks').send(payload);
        
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual("Name is required");
    })

    it('it should return 400 when required description is not provided', async () => {
        const payload = {
            name: "Tarefa 1",
            tag: "Tag"
        }
        
        const res = await request(app).post('/tasks').send(payload);
        
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual("Description is required");
    })

    it('it should return 400 when required tag is not provided', async () => {
        const payload = {
            name: "Tarefa 1",
            description: "Descricao tarefa 1"
        }
        
        const res = await request(app).post('/tasks').send(payload);
        
        expect(res.status).toBe(400);
        expect(res.body.message).toEqual("Tag is required");
    })
})