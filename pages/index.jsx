import Head from 'next/head'
import { useState } from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-javascript'

import styles from './../styles/index.module.scss'

const EditorComponent = ({ code, readOnly, onValueChange }) => {
  return (
    <Editor
      value={code}
      padding={10}
      className={styles.editor}
      onValueChange={readOnly ? () => {} : code => onValueChange({ code })}
      highlight={code => code && languages.javascript ? highlight(code, languages.javascript) : ''}
    />
  )
}

export default () => {
  const [code, setCode] = useState('var x = 1;')
  const [fixedCode, setFixedCode] = useState('')

  const onValueChange = async ({ code: _code }) => {
    setCode(_code)

    const response = await fetch('/api/fix', {
      method: 'POST',
      body: JSON.stringify({ code: _code }),
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

      <div className={styles.wrapper}>
        <div className={styles.editorWrapper}>
          <EditorComponent
            code={code}
            onValueChange={onValueChange}
          />
        </div>

        <div className={styles.editorWrapper}>
          <EditorComponent
            readOnly
            code={fixedCode}
          />
        </div>
      </div>
    </>
  )
}
