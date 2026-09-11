// Reference solution — OOP tree of Node objects (dir or file).

class Node {
  constructor(isDir) {
    this.isDir = isDir
    this.children = isDir ? new Map() : null // name -> Node
    this.content = isDir ? null : ""
  }
}

class FileSystem {
  constructor() {
    this.root = new Node(true)
  }

  _split(path) {
    return path.split("/").filter(Boolean)
  }

  // walk to the node at path; returns null if any segment is missing
  _find(path) {
    const parts = this._split(path)
    let node = this.root
    for (const part of parts) {
      if (!node.isDir || !node.children.has(part)) return null
      node = node.children.get(part)
    }
    return node
  }

  // walk to the parent directory node; returns null if missing or not a dir
  _findParentDir(path) {
    const parts = this._split(path)
    if (parts.length === 0) return null
    parts.pop()
    if (parts.length === 0) return this.root
    let node = this.root
    for (const part of parts) {
      if (!node.isDir || !node.children.has(part)) return null
      node = node.children.get(part)
    }
    return node.isDir ? node : null
  }

  _basename(path) {
    const parts = this._split(path)
    return parts[parts.length - 1]
  }

  mkdir(path) {
    const parent = this._findParentDir(path)
    const name = this._basename(path)
    if (!parent || !name) return false
    if (parent.children.has(name)) return false
    parent.children.set(name, new Node(true))
    return true
  }

  addFile(path, content) {
    const parent = this._findParentDir(path)
    const name = this._basename(path)
    if (!parent || !name) return false
    if (parent.children.has(name)) return false
    const file = new Node(false)
    file.content = content
    parent.children.set(name, file)
    return true
  }

  readFile(path) {
    const node = this._find(path)
    if (!node || node.isDir) return ""
    return node.content
  }

  list(path) {
    const node = path === "/" || path === "" ? this.root : this._find(path)
    if (!node || !node.isDir) return ""
    return [...node.children.keys()].sort().join(", ")
  }

  getSize(path) {
    const node = path === "/" || path === "" ? this.root : this._find(path)
    if (!node) return 0
    if (!node.isDir) return node.content.length
    let total = 0
    for (const child of node.children.values()) {
      total += child.isDir ? this._sizeOfDir(child) : child.content.length
    }
    return total
  }

  _sizeOfDir(dirNode) {
    let total = 0
    for (const child of dirNode.children.values()) {
      total += child.isDir ? this._sizeOfDir(child) : child.content.length
    }
    return total
  }

  findByName(rootPath, name) {
    const rootNode = rootPath === "/" || rootPath === "" ? this.root : this._find(rootPath)
    if (!rootNode) return ""
    const base = rootPath === "/" ? "" : rootPath.replace(/\/$/, "")
    const found = []
    const walk = (node, path) => {
      const nodeName = path.split("/").filter(Boolean).pop()
      if (nodeName === name) found.push(path)
      if (node.isDir) {
        for (const [childName, child] of node.children) {
          walk(child, `${path === "/" ? "" : path}/${childName}`)
        }
      }
    }
    walk(rootNode, base || "/")
    return found.sort().join(", ")
  }
}

export function solution(queries) {
  const fs = new FileSystem()
  const results = []
  for (const q of queries) {
    const [op, ...args] = q
    switch (op) {
      case "MKDIR":
        results.push(String(fs.mkdir(args[0])))
        break
      case "ADD_FILE":
        results.push(String(fs.addFile(args[0], args[1])))
        break
      case "READ_FILE":
        results.push(fs.readFile(args[0]))
        break
      case "LIST":
        results.push(fs.list(args[0]))
        break
      case "GET_SIZE":
        results.push(String(fs.getSize(args[0])))
        break
      case "FIND_BY_NAME":
        results.push(fs.findByName(args[0], args[1]))
        break
      default:
        results.push("")
    }
  }
  return results
}
