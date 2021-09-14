// eslint-disable-next-line @typescript-eslint/no-var-requires
const transformer = require('@nestjs/graphql/plugin')

module.exports.name = 'nestjs-graphql-transformer'
// you should change the version number anytime you change the configuration below - otherwise, jest will not detect changes
module.exports.version = 1

module.exports.factory = (cs) => {
  return transformer.before(
    {
      introspectComments: true,
    },
    cs.program, // "cs.tsCompiler.program" for older versions of Jest (<= v27)
  )
}
