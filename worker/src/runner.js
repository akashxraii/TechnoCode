const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const os = require('os')

const LANGUAGE_CONFIG = {
  python: {
    image: 'python:3.11-slim',
    filename: 'solution.py',
    runCmd: 'python solution.py',
  },
  javascript: {
    image: 'node:20-slim',
    filename: 'solution.js',
    runCmd: 'node solution.js',
  },
  java: {
    image: 'eclipse-temurin:17-jdk-jammy',
    filename: 'Solution.java',
    runCmd: 'javac Solution.java && java Solution',
  },
}

function wrapPython(code, input) {
  return `
import sys

${code}

lines = """${input}""".strip().split("\\n")
nums = list(map(int, lines[0].strip("[]").split(",")))
target = int(lines[1])
sol = Solution()
print(sol.twoSum(nums, target))
`
}

function wrapJavaScript(code, input) {
  return `
${code}

const lines = \`${input}\`.trim().split("\\n");
const nums = JSON.parse(lines[0]);
const target = parseInt(lines[1]);
const sol = new Solution();
console.log(JSON.stringify(sol.twoSum(nums, target)));
`
}

function runCode(language, code, input, timeLimit) {
  if (!timeLimit) timeLimit = 5
  const config = LANGUAGE_CONFIG[language]

  if (!config) {
    return { success: false, error: 'Unsupported language' }
  }

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'technocode-'))

  try {
    let finalCode = code
    if (language === 'python') {
      finalCode = wrapPython(code, input)
    } else if (language === 'javascript') {
      finalCode = wrapJavaScript(code, input)
    }

    const codeFile = path.join(tmpDir, config.filename)
    fs.writeFileSync(codeFile, finalCode)

    const dockerCmd = [
      'docker run',
      '--rm',
      '--network none',
      '--memory 128m',
      '--cpus 0.5',
      '--volume "' + tmpDir + ':/code"',
      '--workdir /code',
      config.image,
      'sh -c "' + config.runCmd + '"',
    ].join(' ')

    const start = Date.now()

    const output = execSync(dockerCmd, {
      timeout: timeLimit * 1000,
      encoding: 'utf8',
    })

    const runtime = Date.now() - start

    return {
      success: true,
      output: output.trim(),
      runtime: runtime,
    }
  } catch (err) {
    if (err.signal === 'SIGTERM' || err.code === 'ETIMEDOUT') {
      return { success: false, error: 'Time Limit Exceeded' }
    }
    return {
      success: false,
      error: err.stderr ? err.stderr.trim() : 'Runtime Error',
    }
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  }
}

module.exports = { runCode }