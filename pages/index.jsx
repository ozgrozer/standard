import Head from 'next/head'
import { useState } from 'react'

export default () => {
  const [fixedCode, setFixedCode] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    const code = event.target.elements.code.value
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
        <textarea name='code' cols='40' rows='10' defaultValue='var x = 1;' />
        <br />
        <button type='submit'>Submit</button>
        <br />
        <textarea name='fixedCode' cols='40' rows='10' value={fixedCode} readOnly />
      </form>
    </>
  )
}
