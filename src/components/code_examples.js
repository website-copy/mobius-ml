import React, { Component } from 'react'
import './code_examples.module.css'
import iconArrowDown from '../assets/arrow-down.svg'
import { graphql } from 'gatsby'

// export const codeSnippetFragment = graphql`
//     fragment CodeSnippet on Snippet {
//         html,
//         nlines,
//         name
//     }
// `
//
// export const codeSnippetsFragment = graphql`
//     fragment CodeSnippets on FileConnection {
//         edges {
//             node {
//                 name
//                 childSnippet {
//                     html
//                     nlines
//                 }
//             }
//         }
//     }
// `

const KEY_LABEL = {
  'on_premise': 'On-Premise',
  'android': 'Android',
  'ios': 'iOS'
}

export const transformSnippets = (snippets) => snippets.edges.reduce(
  (acc, edge) => ({
    ...acc,
    [edge.node.name]: {
      ...edge.node.childSnippet,
      label: KEY_LABEL[edge.node.name]
    }
  }), {}
)

// export const transformResponse = ()

const TAB_LABELS = Object.keys(KEY_LABEL).map(k => KEY_LABEL[k])

const Tabbar = ({ tabsEnabled, activeIndex, onClick }) => (
  <div styleName='tabbar'>
    {TAB_LABELS.map((name, i) => (
      <button
        key={name}
        onClick={onClick.bind(null, i)}
        styleName={`tab ${activeIndex === i ? 'active' : ''}`}
        disabled={!~tabsEnabled.indexOf(name)}
      ><span>{name}</span></button>
    ))}
  </div>
)

const CodeSnippet = ({ code, style }) => (
  <div styleName='code-snippet' style={style}>
    <pre styleName='line-numbers'>
      {code.split('\n').map((_, i) => <span key={i}>{i + 1}<br /></span>)}
    </pre>
    <pre styleName='code' dangerouslySetInnerHTML={{ __html: code }} />
  </div>
)

class CodeExamples extends Component {
  constructor (props) {
    super(props)

    const { snippets } = props

    // maximum lines shown in this example
    this.maxLines = Math.max(...Object.keys(snippets).map(k => snippets[k].nlines))

    this.collapsable = this.maxLines > 7

    this.state = {
      collapsed: this.collapsable,
      activeIndex: 1
    }
  }

  handleTabClick = activeIndex => {
    this.setState({
      activeIndex
    })
  }

  handleExpandClick = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render () {
    const { activeIndex, collapsed } = this.state
    const { snippets } = this.props
    const { collapsable, maxLines } = this

    const examples = Object.keys(KEY_LABEL).map(k => snippets[k])

    const active = examples[activeIndex]
    const height = collapsed
      ? `calc(${1.25 + Math.min(6, maxLines) * 1.25}rem - 1px)`
      : `calc(${1 + active.nlines * 1.25}rem - 1px)`

    return (
      <div styleName='code-examples' className='d-none d-sm-block'>
        <Tabbar
          onClick={this.handleTabClick}
          tabsEnabled={examples.filter(Boolean).map(e => e.label).filter(l => l)}
          activeIndex={activeIndex}
        />
        <CodeSnippet code={active.html} style={{ height }} />
        {collapsable && (
          <div styleName='footer'>
            <button
              disabled={active.nlines <= 7}
              style={{ visibility: active.nlines <= 7 ? 'hidden' : 'visible' }}
              onClick={this.handleExpandClick}
              styleName={`expand-code ${collapsed ? '' : 'collapse'}`}
            >
              <img alt='' src={iconArrowDown} />
              {collapsed ? 'Expand code' : 'Collapse code'}
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default CodeExamples
