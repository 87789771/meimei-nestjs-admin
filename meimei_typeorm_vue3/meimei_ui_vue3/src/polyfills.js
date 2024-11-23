import { Buffer } from 'buffer'
import process from 'process'
import EventEmitter from 'events'

if (typeof window.global === 'undefined') {
  window.global = window
}
if (typeof window.Buffer === 'undefined') {
  window.Buffer = Buffer
}
if (typeof window.process === 'undefined') {
  window.process = process
}
if (typeof window.EventEmitter === 'undefined') {
  window.EventEmitter = EventEmitter
}
// window.global = window
// window.process = process
// window.Buffer = Buffer
