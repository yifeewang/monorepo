const { existsSync, readFileSync } = require('fs')
const { join } = require('path')

const { platform, arch } = process

let nativeBinding = null
let localFileExisted = false
let isMusl = false
let loadError = null

switch (platform) {
  case 'android':
    if (arch !== 'arm64') {
      throw new Error(`Unsupported architecture on Android ${arch}`)
    }
    localFileExisted = existsSync(join(__dirname, 'native.android-arm64.node'))
    try {
      if (localFileExisted) {
        nativeBinding = require('./native.android-arm64.node')
      } else {
        nativeBinding = require('@infras/native-android-arm64')
      }
    } catch (e) {
      loadError = e
    }
    break
  case 'win32':
    switch (arch) {
      case 'x64':
        localFileExisted = existsSync(
          join(__dirname, 'native.win32-x64-msvc.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./native.win32-x64-msvc.node')
          } else {
            nativeBinding = require('@infras/native-win32-x64-msvc')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'ia32':
        localFileExisted = existsSync(
          join(__dirname, 'native.win32-ia32-msvc.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./native.win32-ia32-msvc.node')
          } else {
            nativeBinding = require('@infras/native-win32-ia32-msvc')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm64':
        localFileExisted = existsSync(
          join(__dirname, 'native.win32-arm64-msvc.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./native.win32-arm64-msvc.node')
          } else {
            nativeBinding = require('@infras/native-win32-arm64-msvc')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on Windows: ${arch}`)
    }
    break
  case 'darwin':
    switch (arch) {
      case 'x64':
        localFileExisted = existsSync(join(__dirname, 'native.darwin-x64.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./native.darwin-x64.node')
          } else {
            nativeBinding = require('@infras/native-darwin-x64')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm64':
        localFileExisted = existsSync(
          join(__dirname, 'native.darwin-arm64.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./native.darwin-arm64.node')
          } else {
            nativeBinding = require('@infras/native-darwin-arm64')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on macOS: ${arch}`)
    }
    break
  case 'freebsd':
    if (arch !== 'x64') {
      throw new Error(`Unsupported architecture on FreeBSD: ${arch}`)
    }
    localFileExisted = existsSync(join(__dirname, 'native.freebsd-x64.node'))
    try {
      if (localFileExisted) {
        nativeBinding = require('./native.freebsd-x64.node')
      } else {
        nativeBinding = require('@infras/native-freebsd-x64')
      }
    } catch (e) {
      loadError = e
    }
    break
  case 'linux':
    switch (arch) {
      case 'x64':
        isMusl = readFileSync('/usr/bin/ldd', 'utf8').includes('musl')
        if (isMusl) {
          localFileExisted = existsSync(
            join(__dirname, 'native.linux-x64-musl.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./native.linux-x64-musl.node')
            } else {
              nativeBinding = require('@infras/native-linux-x64-musl')
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(
            join(__dirname, 'native.linux-x64-gnu.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./native.linux-x64-gnu.node')
            } else {
              nativeBinding = require('@infras/native-linux-x64-gnu')
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      case 'arm64':
        isMusl = readFileSync('/usr/bin/ldd', 'utf8').includes('musl')
        if (isMusl) {
          localFileExisted = existsSync(
            join(__dirname, 'native.linux-arm64-musl.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./native.linux-arm64-musl.node')
            } else {
              nativeBinding = require('@infras/native-linux-arm64-musl')
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(
            join(__dirname, 'native.linux-arm64-gnu.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./native.linux-arm64-gnu.node')
            } else {
              nativeBinding = require('@infras/native-linux-arm64-gnu')
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      case 'arm':
        localFileExisted = existsSync(
          join(__dirname, 'native.linux-arm-gnueabihf.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./native.linux-arm-gnueabihf.node')
          } else {
            nativeBinding = require('@infras/native-linux-arm-gnueabihf')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on Linux: ${arch}`)
    }
    break
  default:
    throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`)
}

if (!nativeBinding) {
  if (loadError) {
    throw loadError
  }
  throw new Error(`Failed to load native binding`)
}

const { sum, fibonacci } = nativeBinding

module.exports.sum = sum
module.exports.fibonacci = fibonacci
