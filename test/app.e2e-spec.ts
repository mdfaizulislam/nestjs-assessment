import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('API returns all the Employee Information (hierarchy by position) under any given position in the organogram', () => {
    it('/hierachy/1 (GET) should return 200', async () => {
      const res = await request(app.getHttpServer()).get('/hierarchy/1').send();
      expect(res.status).toBe(200);
    });

    it('/hierachy/2 (GET) should return 200', async () => {
      const res = await request(app.getHttpServer()).get('/hierarchy/2').send();
      expect(res.status).toBe(200);
    });

    it('/hierachy/3 (GET) should return 200', async () => {
      const res = await request(app.getHttpServer()).get('/hierarchy/3').send();
      expect(res.status).toBe(200);
    });

    it('/hierachy/-3 (GET) should return 500', async () => {
      const res = await request(app.getHttpServer())
        .get('/hierarchy/-3')
        .send();
      expect(res.status).toBe(500);
    });

    it('/hierachy (GET) should return 404', async () => {
      const res = await request(app.getHttpServer()).get('/hierarchy').send();
      expect(res.status).toBe(404);
    });
  });

  describe('Call another API with JWT token authorization', () => {
    describe('if user is not logged in or unauthorized', () => {
      it('if user is not logged in - Unauthorized', async () => {
        const res = await request(app.getHttpServer()).get('/org/1').send();
        expect(res.status).toBe(401);
      });

      it('if user is not logged in - Unauthorized', async () => {
        const res = await request(app.getHttpServer()).get('/org/2').send();
        expect(res.status).toBe(401);
      });

      it('if user is not logged in - Unauthorized', async () => {
        const res = await request(app.getHttpServer()).get('/org/3').send();
        expect(res.status).toBe(401);
      });

      it('/posts (POST) with random token/invalid token should return 401', async () => {
        const jwttoken = 'sdwerwetwetrtytuyutynbgh65';
        const res = await request(app.getHttpServer())
          .get('/org/3')
          .set('Authorization', 'Bearer ' + jwttoken)
          .send({});
        expect(res.status).toBe(401);
      });
    });

    describe('if user is logged in', () => {
      let jwttoken: string;
      it('should not able to login ', async () => {
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({ username: 'userA', password: 'asdsaasd' });

        expect(res.status).toBe(401);
        jwttoken = res.body.access_token;
        console.log(JSON.stringify(res));
      });

      it('should able to login and return a bearer token', async () => {
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({ username: 'userA', password: 'abc123abc' });

        expect(res.status).toBe(201);
        jwttoken = res['text'];
        expect(jwttoken.length).toBeGreaterThan(0);
      });

      it('/get should be able to get hierarchy with jwt token', async () => {
        const res = await request(app.getHttpServer())
          .get('/org/1')
          .set('Authorization', 'Bearer ' + jwttoken)
          .send();
        expect(res.status).toBe(200);
      });
    });
  });
});
