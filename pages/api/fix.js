import prettier from 'prettier'
import jscodeshift from 'jscodeshift'
import configStandard from 'prettier-config-standard'

const transformToES6 = code => {
  try {
    const j = jscodeshift.withParser('babel')
    const root = j(code)

    root.find(j.FunctionDeclaration).replaceWith(path => {
      const { node } = path
      const arrowFunction = j.arrowFunctionExpression(node.params, node.body, node.async)
      return j.variableDeclaration('const', [
        j.variableDeclarator(j.identifier(node.id.name), arrowFunction)
      ])
    })

    root.find(j.FunctionExpression).replaceWith(path => {
      const { node } = path
      return j.arrowFunctionExpression(node.params, node.body, node.async)
    })

    return root.toSource()
  } catch (err) {
    throw new Error(err.message)
  }
}

export default async (req, res) => {
  let fixedCode = ''
  try {
    const transformedCode = transformToES6(req.body.code)

    fixedCode = await prettier.format(transformedCode, {
      ...configStandard,
      parser: 'babel'
    })
  } catch (err) {
    fixedCode = err.message
  }
  res.json({ fixedCode })
}
