import Head from 'next/head'
import { useState } from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-javascript'

const EditorComponent = ({ code, setCode, readOnly }) => {
  return (
    <Editor
      value={code}
      padding={10}
      highlight={code => highlight(code, languages.javascript)}
      onValueChange={readOnly ? () => {} : code => setCode(code)}
      style={{
        fontSize: 12,
        color: '#F8F7F4',
        backgroundColor: '#272822',
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
            readOnly
            code={fixedCode}
          />
        </div>
      </form>
    </>
  )
}
