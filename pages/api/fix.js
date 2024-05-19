import { ESLint } from 'eslint'

const eslint = new ESLint({
  fix: true,
  useEslintrc: false,
  overrideConfig: {
    extends: ['standard']
  }
})

const fixCode = async code => {
  try {
    const results = await eslint.lintText(code)
    const fixedCode = results[0].output
    return fixedCode
  } catch (err) {
    console.log(err.message)
  }
}

export default async (req, res) => {
  const code = req.body.code
  const fixedCode = await fixCode(code)
  res.json({ success: true, fixedCode })
}
