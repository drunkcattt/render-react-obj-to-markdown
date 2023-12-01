import React from 'react'
import './App.css'
import ReactDomServer from 'react-dom/server'
import Markdown from 'react-markdown'
import rehypeRaw from "rehype-raw";
import { deserialize } from 'react-serialize'
import xmlFormat from 'xml-formatter'

const reactElement = React.createElement('h1', null, 'Hello World');

const cusPlaceHolder = {
  type: 'div',
  props: {
    children: [
      {
        type: 'h1',
        props: {
          children: 'Invalid React Element'
        }
      },
      {
        type: 'h2',
        props: {
          children: 'Please input valid React Element'
        }
      }
    ]
  }
}



function App() {

  const [cusInput, setCusInput] = React.useState<any>()

  const parseCusInput = (input: string) => {
    try {
      return JSON.parse(input)
    } catch (e) {
      return cusPlaceHolder
    }
  }

  console.log('fuck', parseCusInput(cusInput))


  return (
    <>
      <table>
        <tr>
          <th>React Element JSON</th>
          <th>HTML</th>
          <th>Markdown</th>
        </tr>
        <tr>
          <td>
            <pre>{JSON.stringify(reactElement, null, 2)}</pre>
          </td>
          <td>
            {xmlFormat(ReactDomServer.renderToStaticMarkup(reactElement))}
          </td>
          <td>
            <Markdown
              rehypePlugins={[rehypeRaw]}
              children={ReactDomServer.renderToStaticMarkup(reactElement)}
            />
          </td>
        </tr>
        <tr>
          <td>
            <textarea
              value={cusInput}
              onChange={(e) => setCusInput(e.target.value)}
              style={{ height: '500px' }}
              placeholder='please input'
            />
          </td>
          <td>
            <pre>{xmlFormat(ReactDomServer.renderToStaticMarkup(deserialize(parseCusInput(cusInput))))}</pre>
          </td>
          <td>
            <Markdown
              rehypePlugins={[rehypeRaw]}
              children={ReactDomServer.renderToStaticMarkup(deserialize(parseCusInput(cusInput)))}
            />
          </td>
        </tr>
      </table>
    </>
  )
}

export default App
