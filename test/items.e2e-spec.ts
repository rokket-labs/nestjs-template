import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { Test, TestingModule } from '@nestjs/testing'
import { ReturnModelType } from '@typegoose/typegoose'
import * as request from 'supertest'

import { AppModule } from '../src/app.module'
import { Item } from '../src/items/items.entity'

describe('Items Controller (e2e)', () => {
  let app: NestFastifyApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication(new FastifyAdapter())
    await app.init()
    app
      .getHttpAdapter()
      .getInstance()
      .ready()
  })

  afterAll(async () => {
    await app.close()
  })

  type ItemType = ReturnModelType<typeof Item>

  const item: ItemType = {
    title: 'Great item',
    price: 10,
    description: 'Description of this great item',
  }

  let id = ''

  const updatedItem: ItemType = {
    title: 'Great updated item',
    price: 20,
    description: 'Updated description of this great item',
  }

  const createItemObject = JSON.stringify(item).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
  )

  const createItemQuery = `
    mutation {
      createItem(input: ${createItemObject}) {
        title
        price
        description
        id
      }
    }`

  it('createItem', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: createItemQuery,
      })
      .expect(({ body }) => {
        console.log(body)
        const data = body.data.createItem
        ;({ id } = data)
        expect(data.title).toBe(item.title)
        expect(data.price).toBe(item.price)
        expect(data.description).toBe(item.description)
      })
      .expect(200)
  })

  it('getItems', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: '{items{title, price, description, id}}',
      })
      .expect(({ body }) => {
        const data = body.data.items
        const itemResult = data[0]
        expect(data.length).toBeGreaterThan(0)
        expect(itemResult.title).toBe(item.title)
        expect(itemResult.description).toBe(item.description)
        expect(itemResult.price).toBe(item.price)
      })
      .expect(200)
  })

  const updateItemObject = JSON.stringify(updatedItem).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
  )

  it('updateItem', () => {
    const updateItemQuery = `
    mutation {
      updateItem(id: "${id}", input: ${updateItemObject}) {
        title
        price
        description
        id
      }
    }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: updateItemQuery,
      })
      .expect(({ body }) => {
        const data = body.data.updateItem
        expect(data.title).toBe(updatedItem.title)
        expect(data.description).toBe(updatedItem.description)
        expect(data.price).toBe(updatedItem.price)
      })
      .expect(200)
  })

  it('deleteItem', () => {
    const deleteItemQuery = `
      mutation {
        deleteItem(id: "${id}") {
          title
          price
          description
          id
        }
      }`

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: deleteItemQuery,
      })
      .expect(({ body }) => {
        const data = body.data.deleteItem
        expect(data.title).toBe(updatedItem.title)
        expect(data.description).toBe(updatedItem.description)
        expect(data.price).toBe(updatedItem.price)
      })
      .expect(200)
  })
})
