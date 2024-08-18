import { BrightBaseCRUD } from 'brightside-developer'
import { BrightTable } from '../types/bright.types'


const Tables = {
  iphone_messages: new BrightBaseCRUD<IphoneMessages, IphoneMessagesCreateOptions>('iphone_messages'),
  iphone_post_likes: new BrightBaseCRUD<IphonePostLikes, IphonePostLikesCreateOptions>('iphone_post_likes'),
  iphone_posts: new BrightBaseCRUD<IphonePosts, IphonePostsCreateOptions>('iphone_posts'),
  todos: new BrightBaseCRUD<Todos, TodosCreateOptions>('todos')
}


export type IphoneMessages = BrightTable<'iphone_messages'>
export interface IphoneMessagesCreateOptions {
  OmitOnCreate: 'id' | 'created_at' // Add or Remove fields that are omitted on create
  OptionalOnCreate: never // Add fields that are optional on create
}
export type IphoneMessagesReadOptions = Parameters<typeof Tables.iphone_messages.read>

export type IphoneMessagesInfiniteReadOptions = [
  Parameters<typeof Tables.iphone_messages.read>[0],
  Omit<Parameters<typeof Tables.iphone_messages.read>[1], 'limit' | 'offset'>,
]
      

export type IphonePostLikes = BrightTable<'iphone_post_likes'>
export interface IphonePostLikesCreateOptions {
  OmitOnCreate: 'id' | 'created_at' // Add or Remove fields that are omitted on create
  OptionalOnCreate: never // Add fields that are optional on create
}
export type IphonePostLikesReadOptions = Parameters<typeof Tables.iphone_post_likes.read>

export type IphonePostLikesInfiniteReadOptions = [
  Parameters<typeof Tables.iphone_post_likes.read>[0],
  Omit<Parameters<typeof Tables.iphone_post_likes.read>[1], 'limit' | 'offset'>,
]
      

export type IphonePosts = BrightTable<'iphone_posts'>
export interface IphonePostsCreateOptions {
  OmitOnCreate: 'id' | 'created_at' // Add or Remove fields that are omitted on create
  OptionalOnCreate: never // Add fields that are optional on create
}
export type IphonePostsReadOptions = Parameters<typeof Tables.iphone_posts.read>

export type IphonePostsInfiniteReadOptions = [
  Parameters<typeof Tables.iphone_posts.read>[0],
  Omit<Parameters<typeof Tables.iphone_posts.read>[1], 'limit' | 'offset'>,
]
      

export type Todos = BrightTable<'todos'>
export interface TodosCreateOptions {
  OmitOnCreate: 'id' | 'created_at' // Add or Remove fields that are omitted on create
  OptionalOnCreate: never // Add fields that are optional on create
}
export type TodosReadOptions = Parameters<typeof Tables.todos.read>

export type TodosInfiniteReadOptions = [
  Parameters<typeof Tables.todos.read>[0],
  Omit<Parameters<typeof Tables.todos.read>[1], 'limit' | 'offset'>,
]
      
export default Tables
