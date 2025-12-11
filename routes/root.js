'use strict'

module.exports = async function (fastify, opts) {
  fastify.post('/', async function (request, reply) {
    try {
      const msg = request.body
      fastify.sendMessage(Buffer.from(JSON.stringify(msg)))
      reply.code(201).send({ status: 'success', message: 'Order submitted' })
    } catch (error) {
      console.error('Error submitting order:', error)
      reply.code(500).send({ status: 'error', message: 'Failed to submit order' })
    }
  })

  fastify.get('/health', async function (request, reply) {
    const appVersion = process.env.APP_VERSION || '0.1.0'
    return { status: 'ok', version: appVersion }
  })

  fastify.get('/hugs', async function (request, reply) {
    return { hugs: fastify.someSupport() }
  })
}
