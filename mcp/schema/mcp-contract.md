# VitaeContext MCP Protocol Contract

Specification for the VitaeContext Model Context Protocol (MCP) server interface, adhering to version `2024-11-05`.

---

## 1. Lifecycle

### `initialize`
* **Request**:
  ```json
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
      "protocolVersion": "2024-11-05",
      "capabilities": {},
      "clientInfo": { "name": "example-client", "version": "1.0.0" }
    }
  }
  ```
* **Response**:
  ```json
  {
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
      "protocolVersion": "2024-11-05",
      "capabilities": {
        "resources": { "listChanged": false },
        "tools": { "listChanged": false },
        "prompts": { "listChanged": false }
      },
      "serverInfo": {
        "name": "vitaecontext",
        "version": "2.3.0"
      }
    }
  }
  ```

---

## 2. Resources

### `career-context://current`
* **MIME type**: `text/markdown`
* **Description**: Returns the user-selected Career Context file. Selection uses `--context`, `VITAECONTEXT_CAREER_CONTEXT`, the canonical `~/.vitaecontext/career-context.md`, or one unambiguous matching file in that order. It never substitutes bundled demo data.

### `vitaegraph://index`
* **MIME type**: `application/json`
* **Description**: Returns the deterministic graph index from `~/.vitaecontext/vitaegraph/.generated/graph.json`.

### `vitaegraph://record/{id}`
* **MIME type**: `text/markdown`
* **Description**: Reads a specific domain record by ID.

### `vitaecontext://wiki/{module}`
* **MIME type**: `text/markdown`
* **Description**: Reads the wiki entry for a given module (`vitaecontext`, `build`, `vitaegraph`).

---

## 3. Tools

### `get_career_context`
* **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "for": {
        "type": "string",
        "enum": ["cv", "github", "linkedin", "portfolio", "x", "general"],
        "default": "general"
      }
    },
    "additionalProperties": false
  }
  ```

### `search_vitaegraph`
* **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {
      "query": { "type": "string" },
      "type": { "type": "string" },
      "tag": { "type": "string" }
    },
    "additionalProperties": false
  }
  ```

### `validate_career_context`
* **Input Schema**:
  ```json
  {
    "type": "object",
    "properties": {},
    "additionalProperties": false
  }
  ```

---

## 4. Prompts

### `cv_tailoring`
* **Arguments**: `targetRole` (required), `jobDescription` (optional).
* **Returns**: ATS formatting instructions + grounded career context packet.

### `linkedin_audit`
* **Arguments**: `profileSnapshot` (optional).
* **Returns**: LinkedIn discoverability scoring + section-by-section audit instructions.

### `github_showcase`
* **Arguments**: `focus` (optional).
* **Returns**: Profile README and pinned repository showcase review.

### `career_context_intake`
* **Arguments**: `rawNotes` (optional).
* **Returns**: Step-by-step career context intake questionnaire and synthesis instructions.

---

## 5. Filesystem access

Filesystem roots are user-controlled server configuration, not model-controlled tool arguments:

```bash
vitaecontext mcp --context <career-context-file> --root <vitaegraph-directory>
```

`VITAECONTEXT_CAREER_CONTEXT` and `VITAEGRAPH_ROOT` provide equivalent environment configuration. `vitaegraph://record/{id}` resolves the stable ID through `.generated/graph.json` and rejects paths outside the configured VitaeGraph root. Wiki resources accept only the packaged module allowlist.

## 6. Errors

- Invalid JSON returns JSON-RPC `-32700`.
- Invalid requests return `-32600`.
- Invalid tool names, prompt names, arguments, and parameters return `-32602`.
- Unavailable graph, record, wiki, and unsupported resources return `-32002` with the requested URI in `error.data`. The fixed `career-context://current` resource instead returns a short selection or initialization notice when no context is active.
- Unexpected implementation failures return `-32603`; diagnostic details are written to `stderr`, not mixed into the `stdout` protocol stream.
