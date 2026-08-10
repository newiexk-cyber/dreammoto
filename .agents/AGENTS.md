# Antigravity Workspace Rules

## Superpowers Workflows
- **Strict Compliance**: For any new features, bug fixes, refactoring, or code modifications, strictly follow the Superpowers workflows:
  1. **Brainstorming** (`superpowers:brainstorming`): Explore context, ask clarifying questions one at a time, propose approaches, design with clean boundaries, write spec to `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`, obtain user approval before any code implementation.
  2. **Writing Plans** (`superpowers:writing-plans`): Write a detailed implementation plan with no placeholders and structured steps (including failing test, verify red, implement, verify green, commit), saved to `docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md`.
  3. **Test-Driven Development** (`superpowers:test-driven-development`): Apply TDD (Red-Green-Refactor) for every change. Write the test first, verify failure, write minimal code, verify pass, and refactor. No production code is written without a failing test first.
  
## Tool Mapping for Antigravity
- **Task Tracking**: Do not use `manage_task` (which is for background processes) for checklist tracking. Instead, create a task artifact using `write_to_file` with `IsArtifact: true` and `ArtifactType: "task"` (e.g., saving to `task.md`), and update it using code edit tools as steps are completed.
- **Subagent Dispatch**: When dispatching a subagent, use `invoke_subagent` with the appropriate `TypeName` (e.g. `self` for full implementation capability, `research` for read-only tasks).
