import Head from 'next/head'
import { useState } from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prism-themes/themes/prism-atom-dark.css'

const EditorComponent = ({ code, setCode }) => {
  return (
    <Editor
      value={code}
      padding={10}
      onValueChange={code => setCode(code)}
      highlight={code => highlight(code, languages.javascript)}
      style={{
        fontSize: 12,
        color: '#fff',
        backgroundColor: '#1D1F21',
        fontFamily: '"Fira code", "Fira Mono", monospace'
      }}
    />
  )
}

export default () => {
  const [code, setCode] = useState('var x = 1;')
  const [fixedCode, setFixedCode] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    const response = await fetch('/api/fix', {
      method: 'POST',
      body: JSON.stringify({ code }),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json()

    setFixedCode(data.fixedCode)
  }

  return (
    <>
      <Head>
        <title>Standard Fix</title>
      </Head>

      <form onSubmit={handleSubmit}>
        <div>
          <EditorComponent
            code={code}
            setCode={setCode}
          />
        </div>

        <div>
          <button type='submit'>Submit</button>
        </div>

        <div>
          <EditorComponent
            code={fixedCode}
          />
        </div>
      </form>
    </>
  )
}
