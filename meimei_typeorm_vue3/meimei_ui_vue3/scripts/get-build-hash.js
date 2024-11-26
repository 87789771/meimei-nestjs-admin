#!/usr/bin/env node

import { execSync } from 'child_process'
import crypto from 'crypto'

function getGitHash() {
  try {
    return execSync('git rev-parse --short HEAD', { stdio: 'pipe' }).toString().trim()
  } catch {
    return null
  }
}

function generateRandomHash() {
  return crypto.randomBytes(4).toString('hex').slice(0, 7)
}

const hash = getGitHash() || generateRandomHash()
console.log(hash)
