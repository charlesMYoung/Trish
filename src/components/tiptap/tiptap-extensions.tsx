import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import Document from '@tiptap/extension-document'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Text from '@tiptap/extension-text'
import StarterKit from '@tiptap/starter-kit'

export const TipTapExtends = [
  StarterKit.configure({
    heading: {
      levels: [2, 3, 4, 5, 6],
    },
  }),
  Document,
  Paragraph,
  Image.configure({
    allowBase64: true,
    inline: true,
  }),
  Blockquote,
  Bold,
  Text,
  TableRow,
  TableHeader,
  TableCell,
  Table,
  TaskItem,
  TaskList,
]
