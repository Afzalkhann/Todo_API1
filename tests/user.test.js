const {app,server}=require('../index')
const request=require('supertest')
const pool=require('../utils/db')
const { query } = require('express')

describe('User Registration', ()=>{
    it('registers a new user with valid details', async()=>{
        const res=await request(app)
        .post('/users/register')
        .send({email:'test@example.com',name:'Test User'})

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('user registered successfully')
    })
    it('fails to register with an existing email',async()=>{
        const res=await request(app)
        .post('/users/register')
        .send({email:'test@example.com',name:'Another User'})

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('User with this email already exists')
    })
    it('fails to register without required fields',async()=>{
        const res=await request(app)
        .post('/users/register')
        .send({email:'test@example.com'})

    expect(res.status).toBe(500);
    // expect(res.body.message).toBe('User with this email already exists')
    })
})

describe('User Login', () => {
  // Positive scenario: Login with correct credentials
  it('should login with correct credentials', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({ email: 'admin1@gmail.com' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('authToken'); // Ensure it returns a token
  });

  // Negative scenario: Login with incorrect email
  it('should not login with incorrect email', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({ email: 'incorrectemail@example.com' });

    expect(res.status).toBe(404); // Or 401, based on your error handling
  });

  
  // Negative scenario: Login without email or password
  it('should not login without email ', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({});

    expect(res.status).toBe(400); 
  });
})
const query1='delete from users where email=$1 RETURNING *'
 const res=pool.query(query1,['test68@example.com'])
 console.log(res)

afterAll(async () => {
    await server.close();
    await pool.end();
     // Close the server after all tests are done
});
