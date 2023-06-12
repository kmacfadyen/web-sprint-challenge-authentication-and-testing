// Write your tests here
const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

afterAll(async () => {
  await db.destroy()
})

const exampleUser = { username: 'mike', password: 'smith' }

test('sanity', () => {
  expect(true).toBe(true)
})
