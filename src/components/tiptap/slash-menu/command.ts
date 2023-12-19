import { SlashMenuCommand } from '@/config'
import { Extension } from '@tiptap/core'
import Suggestion, { SuggestionProps } from '@tiptap/suggestion'

export default Extension.create({
  name: 'commands',
  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({
          editor,
          range,
          props,
        }: SuggestionProps & { props: SlashMenuCommand }) => {
          if (props) {
            props.command && props.command({ editor, range })
          }
        },
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        ...this.options.suggestion,
        editor: this.editor,
      }),
    ]
  },
})
