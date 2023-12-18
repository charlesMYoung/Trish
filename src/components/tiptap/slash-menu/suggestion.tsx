// eslint-disable-next-line import/no-anonymous-default-export
export default ({ onStart, onUpdate, onKeyDown, onExit }) => {
  return {
    items: ({ query }) => {
      return [
        {
          icon: 'icon',
          title: 'H1',
          description: 'this is h1 text',
          command: ({ editor, range }) => {
            editor
              .chain()
              .focus()
              .deleteRange(range)
              .setNode('heading', { level: 1 })
              .run()
          },
        },
        {
          title: 'H2',
          description: 'this is h2 text',
          command: ({ editor, range }) => {
            editor
              .chain()
              .focus()
              .deleteRange(range)
              .setNode('heading', { level: 2 })
              .run()
          },
        },
        {
          title: 'bold',
          description: 'this is text 3',
          command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setMark('bold').run()
          },
        },
        {
          title: 'italic',
          description: 'this is text 3',
          command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setMark('italic').run()
          },
        },
      ]
        .filter((item) =>
          item.title.toLowerCase().startsWith(query.toLowerCase())
        )
        .slice(0, 10)
    },

    render: () => {
      return {
        onStart: (props) => {
          onStart(props)
          console.log('onStart props', props)
        },

        onUpdate(props) {
          console.log('onUpdate props', props)
        },

        onKeyDown(props) {
          console.log('onKeyDown>>>>>>', props)
          return onKeyDown(props)
        },
        onExit(props) {
          onExit(props)
          console.log('onExit props', props)
        },
      }
    },
  }
}
