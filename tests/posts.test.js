const request = require('supertest'); // testing solicitudes http
const app = require('../index'); 
const Post = require('../models/Post');
const mongoose = require('mongoose'); // Para cerrar la conexión después

describe('POST /create', () => {

    beforeEach(async () => {
        await Post.deleteMany(); // Limpiar la base de datos antes de cada prueba (función de mongoose)
    });

    afterAll(async () => {
        // Cerrar la conexión después de todas las pruebas
        await mongoose.connection.close();
    });

    it('should create a new post', async () => {
        const res = await request(app)
            .post('/create')
            .send({
                title: 'Post title',
                body: 'Post body content',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id'); // Verificamos que el cuerpo de la respuesta tenga la propiedad _id (indicador de que el post fue creado).
        expect(res.body.title).toEqual('Post title'); // Verificamos que el título del post en la respuesta coincida con el enviado
    });

    it('should return 400 if title is missing', async () => {
        const res = await request(app)
            .post('/create')
            .send({
                body: 'Post body content',
            });
        expect(res.statusCode).toEqual(400);
    });
});
