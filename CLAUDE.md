# Job Application Tracker

## Who writes what

### AI may write
- CSS and Tailwind styling
- Visual styling and appearance
- Colors, spacing, typography, sizing, borders, shadows, and animations
- Responsive styling
- Styling of existing components

AI must not create or modify component logic, functionality, state, data handling, or application behavior.

### AI must NOT write
- Application/business logic
- Data models or application data
- Database queries or database logic
- API implementation or API integration logic
- AI/LLM integration code
- Prompts, agents, RAG, or other AI functionality

For anything in the areas above, AI may explain concepts, suggest approaches, or review code that I write, but I will write the implementation myself.

## How AI changes are checked

- Keep each AI change small enough for me to review in one sitting.
- AI must not make large, unrelated changes.
- I will review all AI-generated code before it is used or committed.
- AI must not commit changes, create commits, or push to the repository.
- I am responsible for reviewing `git diff` and deciding whether changes should be kept.
- I write all commit messages and make all commits myself.
- When working on logic, data, APIs, or AI integration, AI should explain and guide rather than implement the code for me.