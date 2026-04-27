import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import post from './schemaTypes/post'

export default defineConfig({
  name: 'default',
  title: 'taqbit-blogs',

  projectId: 'c4hmiq4c',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [post],
  },
})
